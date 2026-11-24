import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import transactionRoutes from './routes/transactions.js';
import categoryRoutes from './routes/categories.js';
import budgetRoutes from './routes/budgets.js';
import reportRoutes from './routes/reports.js';
const app=express();
app.use(helmet());
app.use(cors({origin:process.env.CLIENT_URL?.split(',')||'http://localhost:5173'}));
app.use(express.json({limit:'1mb'}));
app.use('/api/auth',rateLimit({windowMs:15*60*1000,max:100}),authRoutes);
app.get('/api/health',(req,res)=>res.json({status:'ok',service:'ExpenseFlow API'}));
import auth from './middleware/auth.js';
app.use('/api/transactions',auth,transactionRoutes);
app.use('/api/categories',auth,categoryRoutes);
app.use('/api/budgets',auth,budgetRoutes);
app.use('/api/reports',auth,reportRoutes);
app.use((err,req,res,next)=>{console.error(err);if(err.name==='ValidationError')return res.status(400).json({message:err.message});if(err.name==='CastError')return res.status(400).json({message:'Invalid resource ID'});res.status(500).json({message:'Server error'});});
const port=process.env.PORT||5000;
if(!process.env.JWT_SECRET)throw new Error('JWT_SECRET is required. Copy .env.example to .env and set a secret.');
mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/expenseflow')
 .then(()=>app.listen(port,()=>console.log(`ExpenseFlow API running on http://localhost:${port}`)))
 .catch(err=>{console.error('MongoDB connection failed:',err.message);process.exit(1)});
