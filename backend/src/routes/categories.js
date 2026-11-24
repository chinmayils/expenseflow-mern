import {Router} from 'express';
import Category from '../models/Category.js';
const router=Router();
const defaults=[['Food','expense'],['Transport','expense'],['Shopping','expense'],['Bills','expense'],['Health','expense'],['Entertainment','expense'],['Education','expense'],['Other','expense'],['Salary','income'],['Freelance','income'],['Investment','income'],['Gift','income'],['Other income','income']];
router.get('/',async(req,res,next)=>{try{
 let items=await Category.find({user:req.user._id}).sort({type:1,name:1});
 if(!items.length){await Category.insertMany(defaults.map(([name,type])=>({user:req.user._id,name,type})));items=await Category.find({user:req.user._id}).sort({type:1,name:1});}
 res.json({categories:items.map(c=>({id:c._id,name:c.name,type:c.type}))});
}catch(e){next(e)}});
router.post('/',async(req,res,next)=>{try{const {name,type}=req.body;if(!name?.trim()||!['income','expense'].includes(type))return res.status(400).json({message:'Name and valid type are required'});const c=await Category.create({user:req.user._id,name:name.trim(),type});res.status(201).json({category:{id:c._id,name:c.name,type:c.type}})}catch(e){if(e.code===11000)return res.status(409).json({message:'Category already exists'});next(e)}});
router.delete('/:id',async(req,res,next)=>{try{const c=await Category.findOneAndDelete({_id:req.params.id,user:req.user._id});if(!c)return res.status(404).json({message:'Category not found'});res.json({message:'Category deleted'})}catch(e){next(e)}});
export default router;
