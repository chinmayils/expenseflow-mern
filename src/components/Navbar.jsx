import { Bell, Menu, Moon, Sun, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
export default function Navbar({ onMenu, dark, setDark }) {
  const { user } = useAuth()
  return <header className="topbar"><div className="flex items-center gap-3"><button className="icon-btn mobile-menu" onClick={onMenu}><Menu/></button><div className="search-box"><Search size={17}/><input placeholder="Search anything..." /></div></div><div className="flex items-center gap-3"><button className="icon-btn" onClick={() => setDark(!dark)} title="Toggle theme">{dark ? <Sun size={18}/> : <Moon size={18}/>}</button><button className="icon-btn relative" title="Notifications"><Bell size={18}/><span className="notification-dot"/></button><div className="user-chip"><div className="avatar">{(user?.name || 'U').slice(0,1).toUpperCase()}</div><div className="hidden sm:block"><p className="text-sm font-semibold">{user?.name || 'Guest User'}</p><p className="muted text-xs">Personal account</p></div></div></div></header>
}
