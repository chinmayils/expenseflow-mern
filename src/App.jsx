import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import { Login, Register } from './pages/Auth'
import DashboardLayout from './layouts/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import TransactionForm from './pages/TransactionForm'
import { Categories, Reports, Budget, Profile, Settings } from './pages/MorePages'

export default function App() {
  return <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route element={<ProtectedRoute/>}>
      <Route element={<DashboardLayout/>}>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
        <Route path="/add-expense" element={<TransactionForm type="expense"/>}/>
        <Route path="/add-income" element={<TransactionForm type="income"/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/reports" element={<Reports/>}/>
        <Route path="/budget" element={<Budget/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>
}
