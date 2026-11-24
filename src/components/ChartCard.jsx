export default function ChartCard({ title, subtitle, children, className = '' }) {
  return <section className={`panel ${className}`}><div className="mb-4"><h3 className="font-bold">{title}</h3>{subtitle && <p className="muted text-xs mt-1">{subtitle}</p>}</div>{children}</section>
}
