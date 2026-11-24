import {Router} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
const router=Router();
const tokenFor=user=>jwt.sign({sub:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
const publicUser=user=>({id:user._id,name:user.name,email:user.email,currency:user.currency});
router.post('/register',async(req,res,next)=>{
 try{
  const {name,email,password}=req.body;
  if(!name?.trim()||!/^\\S+@\\S+\\.\\S+$/.test(email||'')||typeof password!=='string'||password.length<8)
   return res.status(400).json({message:'Enter a name, valid email and password of at least 8 characters'});
  if(await User.findOne({email:email.toLowerCase()})) return res.status(409).json({message:'An account with this email already exists'});
  const user=await User.create({name:name.trim(),email:email.toLowerCase(),password:await bcrypt.hash(password,12)});
  res.status(201).json({token:tokenFor(user),user:publicUser(user)});
 }catch(e){next(e)}
});
router.post('/login',async(req,res,next)=>{
 try{
  const {email,password}=req.body;
  const user=await User.findOne({email:(email||'').toLowerCase()}).select('+password');
  if(!user||!await bcrypt.compare(password||'',user.password)) return res.status(401).json({message:'Invalid email or password'});
  res.json({token:tokenFor(user),user:publicUser(user)});
 }catch(e){next(e)}
});
router.get('/me',auth,(req,res)=>res.json({user:publicUser(req.user)}));
router.patch('/me',auth,async(req,res,next)=>{
 try{
  const name=String(req.body.name||'').trim();
  if(name.length<2) return res.status(400).json({message:'Name must contain at least 2 characters'});
  req.user.name=name;
  if(['INR','USD','EUR','GBP'].includes(req.body.currency)) req.user.currency=req.body.currency;
  await req.user.save(); res.json({user:publicUser(req.user)});
 }catch(e){next(e)}
});
export default router;
