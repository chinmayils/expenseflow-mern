import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  title:{type:String,required:true,trim:true,maxlength:120},
  amount:{type:Number,required:true,min:0.01},
  type:{type:String,enum:['income','expense'],required:true},
  category:{type:String,required:true,trim:true,maxlength:60},
  date:{type:String,required:true},
  paymentMethod:{type:String,default:'Other'},
  description:{type:String,default:'',maxlength:500}
},{timestamps:true});
export default mongoose.model('Transaction',schema);
