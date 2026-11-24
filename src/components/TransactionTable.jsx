import { Pencil, Trash2, ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { money, dateLabel } from '../utils/format'

export default function TransactionTable({ transactions, onEdit, onDelete, currency = 'INR', compact = false }) {
  if (!transactions.length) return <div className="empty-state"><div className="empty-icon">↗</div><h3 className="font-semibold mt-3">No transactions found</h3><p className="muted text-sm mt-1">Try changing your filters or add a new transaction.</p></div>
  return <div className="overflow-x-auto"><table className="data-table"><thead><tr><th>Transaction</th><th>Category</th><th>Date</th><th>Payment</th><th>Amount</th><th>Type</th>{!compact && <th>Actions</th>}</tr></thead><tbody>
    {transactions.map(t => <tr key={t.id}><td><div className="flex items-center gap-3"><span className={`transaction-icon ${t.type}`}>{t.type === 'income' ? <ArrowDownLeft size={16}/> : <ArrowUpRight size={16}/>}</span><div><p className="font-semibold text-sm">{t.title}</p>{t.description && <p className="muted text-xs truncate max-w-40">{t.description}</p>}</div></div></td><td>{t.category}</td><td>{dateLabel(t.date)}</td><td>{t.paymentMethod || '—'}</td><td className={`font-bold ${t.type === 'income' ? 'income-text' : 'expense-text'}`}>{t.type === 'income' ? '+' : '−'}{money(t.amount, currency)}</td><td><span className={`type-pill ${t.type}`}>{t.type}</span></td>{!compact && <td><div className="flex gap-1"><button className="icon-btn" title="Edit" onClick={() => onEdit?.(t)}><Pencil size={15}/></button><button className="icon-btn danger-hover" title="Delete" onClick={() => onDelete?.(t)}><Trash2 size={15}/></button></div></td>}</tr>)}
  </tbody></table></div>
}
