import {Router} from 'express';
import Budget from '../models/Budget.js';
const router=Router();
router.get('/',async(req,res,next)=>{try{const items=await Budget.find({user:req.user._id}).sort({month:-1});res.json({budgets:items.map(b=>({id:b._id,month:b.month,amount:b.amount}))})}catch(e){next(e)}});
router.post('/',async(req,res,next)=>{try{const {month,amount}=req.body;if(!/^\\d{4}-\\d{2}$/.test(month||'')||!Number.isFinite(Number(amount))||Number(amount)<=0)return res.status(400).json({message:'Provide a valid month and positive budget'});const b=await Budget.findOneAndUpdate({user:req.user._id,month},{amount:Number(amount)},{new:true,upsert:true,runValidators:true});res.status(200).json({budget:{id:b._id,month:b.month,amount:b.amount}})}catch(e){next(e)}});
router.delete('/:id',async(req,res,next)=>{try{const b=await Budget.findOneAndDelete({_id:req.params.id,user:req.user._id});if(!b)return res.status(404).json({message:'Budget not found'});res.json({message:'Budget deleted'})}catch(e){next(e)}});
export default router;
