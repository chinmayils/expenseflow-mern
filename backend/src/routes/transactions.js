import {Router} from 'express';
import Transaction from '../models/Transaction.js';
const router=Router();
const shape=t=>({...t.toObject(),id:t._id.toString(),_id:undefined,user:undefined});
router.get('/',async(req,res,next)=>{
 try{
  const q={user:req.user._id};
  if(['income','expense'].includes(req.query.type))q.type=req.query.type;
  if(req.query.category)q.category=req.query.category;
  if(req.query.from||req.query.to){q.date={};if(req.query.from)q.date.$gte=req.query.from;if(req.query.to)q.date.$lte=req.query.to}
  const rows=await Transaction.find(q).sort({date:-1,createdAt:-1});
  res.json({transactions:rows.map(shape)});
 }catch(e){next(e)}
});
router.post('/',async(req,res,next)=>{
 try{
  const {title,amount,type,category,date,paymentMethod,description}=req.body;
  if(!title?.trim()||!Number.isFinite(Number(amount))||Number(amount)<=0||!['income','expense'].includes(type)||!category?.trim()||!/^\\d{4}-\\d{2}-\\d{2}$/.test(date||''))
   return res.status(400).json({message:'Provide a title, positive amount, valid type, category and date'});
  const row=await Transaction.create({user:req.user._id,title,amount:Number(amount),type,category,date,paymentMethod,description});
  res.status(201).json({transaction:shape(row)});
 }catch(e){next(e)}
});
router.put('/:id',async(req,res,next)=>{
 try{
  const allowed=['title','amount','type','category','date','paymentMethod','description'];
  const data=Object.fromEntries(Object.entries(req.body).filter(([k])=>allowed.includes(k)));
  if(data.amount!==undefined&&(!Number.isFinite(Number(data.amount))||Number(data.amount)<=0))return res.status(400).json({message:'Amount must be positive'});
  const row=await Transaction.findOneAndUpdate({_id:req.params.id,user:req.user._id},data,{new:true,runValidators:true});
  if(!row)return res.status(404).json({message:'Transaction not found'});
  res.json({transaction:shape(row)});
 }catch(e){next(e)}
});
router.delete('/:id',async(req,res,next)=>{
 try{const row=await Transaction.findOneAndDelete({_id:req.params.id,user:req.user._id});if(!row)return res.status(404).json({message:'Transaction not found'});res.json({message:'Transaction deleted'});}catch(e){next(e)}
});
router.delete('/',async(req,res,next)=>{
 try{await Transaction.deleteMany({user:req.user._id});res.json({message:'All transactions deleted'});}catch(e){next(e)}
});
export default router;
