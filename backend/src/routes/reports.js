import {Router} from 'express';
import Transaction from '../models/Transaction.js';
const router=Router();
router.get('/',async(req,res,next)=>{try{
 const rows=await Transaction.find({user:req.user._id});
 const totals={income:0,expenses:0,balance:0};
 const byCategory={},byMonth={};
 for(const t of rows){const amount=Number(t.amount);totals[t.type==='income'?'income':'expenses']+=amount;const m=t.date.slice(0,7);byMonth[m]??={month:m,income:0,expenses:0};byMonth[m][t.type==='income'?'income':'expenses']+=amount;if(t.type==='expense')byCategory[t.category]=(byCategory[t.category]||0)+amount;}
 totals.balance=totals.income-totals.expenses;
 res.json({totals,byCategory:Object.entries(byCategory).map(([category,amount])=>({category,amount})),byMonth:Object.values(byMonth).sort((a,b)=>a.month.localeCompare(b.month))});
}catch(e){next(e)}});
export default router;
