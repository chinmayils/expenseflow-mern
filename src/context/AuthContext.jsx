import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loginUser, registerUser, getCurrentUser, updateProfile } from '../services/authService'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('expense_token')
    if (!token) { setLoading(false); return }
    getCurrentUser()
      .then(({ data }) => { setUser(data.user); if (data.user?.currency) localStorage.setItem('expense_currency', data.user.currency) })
      .catch(() => { localStorage.removeItem('expense_token'); setUser(null) })
      .finally(() => setLoading(false))
  }, [])

  const saveSession = (data) => {
    localStorage.setItem('expense_token', data.token)
    if (data.user?.currency) localStorage.setItem('expense_currency', data.user.currency)
    setUser(data.user)
    window.dispatchEvent(new Event('expense-session-changed'))
    return data.user
  }
  const login = async (email, password) => {
    const { data } = await loginUser({ email, password })
    return saveSession(data)
  }
  const register = async (payload) => {
    const { data } = await registerUser(payload)
    return saveSession(data)
  }
  const updateUser = async (payload) => {
    const { data } = await updateProfile(payload)
    setUser(data.user)
    if (data.user?.currency) localStorage.setItem('expense_currency', data.user.currency)
    return data.user
  }
  const logout = () => {
    localStorage.removeItem('expense_token')
    setUser(null)
    window.dispatchEvent(new Event('expense-session-changed'))
  }
  const value = useMemo(() => ({ user, loading, login, register, updateUser, logout }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
