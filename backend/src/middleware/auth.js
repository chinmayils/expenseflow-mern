import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export default async function auth(req,res,next){
 try{
  const header=req.headers.authorization||'';
  if(!header.startsWith('Bearer ')) return res.status(401).json({message:'Authentication required'});
  const payload=jwt.verify(header.slice(7),process.env.JWT_SECRET);
  const user=await User.findById(payload.sub).select('-password');
  if(!user) return res.status(401).json({message:'Account no longer exists'});
  req.user=user; next();
 }catch(e){return res.status(401).json({message:'Invalid or expired session'});}
}
