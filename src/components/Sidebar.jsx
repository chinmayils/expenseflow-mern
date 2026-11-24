import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, CirclePlus, Wallet, Tags, ChartNoAxesCombined, PiggyBank, UserRound, Settings, LogOut, X, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
const links = [
  ['Dashboard','/dashboard',LayoutDashboard],['Transactions','/transactions',ArrowLeftRight],['Add Expense','/add-expense',CirclePlus],['Add Income','/add-income',TrendingUp],['Categories','/categories',Tags],['Reports & Analytics','/reports',ChartNoAxesCombined],['Budget','/budget',PiggyBank],['Profile','/profile',UserRound],['Settings','/settings',Settings],
]
export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const signOut = () => { logout(); navigate('/login') }
  return <>
    {open && <div className="sidebar-overlay" onClick={onClose}/>}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand-row"><div className="brand-mark"><Wallet size={20}/></div><span>Expense<span className="brand-light">Flow</span></span><button className="icon-btn sidebar-close" onClick={onClose}><X size={18}/></button></div>
      <p className="nav-caption">WORKSPACE</p>
      <nav className="nav-links">{links.map(([label,path,Icon]) => <NavLink key={path} to={path} onClick={onClose} className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="upgrade-card"><div className="upgrade-icon"><TrendingUp size={18}/></div><p className="font-semibold text-sm mt-2">Stay on top of money</p><p className="text-xs muted mt-1">Small steps make a big difference.</p></div><button className="nav-link logout-link" onClick={signOut}><LogOut size={18}/><span>Logout</span></button></div>
    </aside>
  </>
}
