import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
export default function DashboardLayout() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(localStorage.getItem('expense_theme') === 'dark')
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('expense_theme', dark ? 'dark' : 'light') }, [dark])
  return <div className="app-shell"><Sidebar open={open} onClose={() => setOpen(false)}/><main className="main-area"><Navbar onMenu={() => setOpen(true)} dark={dark} setDark={setDark}/><div className="page-content"><Outlet/></div></main></div>
}
