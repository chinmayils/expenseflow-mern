export default function DashboardCard({ title, amount, change, icon: Icon, tone = 'indigo', currency }) {
  return <div className="stat-card">
    <div className="flex items-start justify-between"><div><p className="muted text-sm">{title}</p><h3 className="text-2xl font-bold mt-2">{new Intl.NumberFormat('en-IN',{style:'currency',currency:currency || 'INR',maximumFractionDigits:0}).format(amount)}</h3></div>
      <div className={`stat-icon ${tone}`}><Icon size={21}/></div></div>
    <p className="text-xs mt-4 text-slate-500"><span className="text-emerald-600 font-semibold">{change}</span> <span>vs. last month</span></p>
  </div>
}
