import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getTransactions, createTransaction, updateTransaction as updateTransactionApi, deleteTransaction as deleteTransactionApi, clearTransactions } from '../services/transactionService'

const ExpenseContext = createContext(null)
export function ExpenseProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [currency, setCurrencyState] = useState(localStorage.getItem('expense_currency') || 'INR')
  const [loadingTransactions, setLoadingTransactions] = useState(false)
  const [error, setError] = useState('')

  const refreshTransactions = async () => {
    if (!localStorage.getItem('expense_token')) { setTransactions([]); return }
    setLoadingTransactions(true); setError('')
    try {
      const { data } = await getTransactions()
      setTransactions(data.transactions || [])
    } catch (e) {
      setError(e.response?.data?.message || 'Could not load transactions')
      throw e
    } finally { setLoadingTransactions(false) }
  }

  useEffect(() => {
    if (localStorage.getItem('expense_token')) refreshTransactions().catch(() => {})
    else setTransactions([])
    const onSession = () => {
      setCurrencyState(localStorage.getItem('expense_currency') || 'INR')
      if (localStorage.getItem('expense_token')) refreshTransactions().catch(() => {})
      else setTransactions([])
    }
    window.addEventListener('expense-session-changed', onSession)
    return () => window.removeEventListener('expense-session-changed', onSession)
  }, [])

  const addTransaction = async (data) => {
    const { data: result } = await createTransaction(data)
    setTransactions(current => [result.transaction, ...current])
    return result.transaction
  }
  const updateTransaction = async (id, data) => {
    const { data: result } = await updateTransactionApi(id, data)
    setTransactions(current => current.map(t => (t.id === id || t._id === id) ? result.transaction : t))
    return result.transaction
  }
  const deleteTransaction = async (transaction) => {
    const id = typeof transaction === 'object' ? (transaction.id || transaction._id) : transaction
    await deleteTransactionApi(id)
    setTransactions(current => current.filter(t => t.id !== id && t._id !== id))
  }
  const reset = async () => {
    await clearTransactions()
    setTransactions([])
  }
  const setCurrency = (value) => setCurrencyState(value)
  const totals = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((s,t) => s + Number(t.amount), 0)
    const expenses = transactions.filter(t => t.type === 'expense').reduce((s,t) => s + Number(t.amount), 0)
    return { income, expenses, balance: income - expenses, savings: income - expenses }
  }, [transactions])
  const value = { transactions, addTransaction, updateTransaction, deleteTransaction, totals, currency, setCurrency, reset, refreshTransactions, loadingTransactions, error }
  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}
export const useExpenses = () => useContext(ExpenseContext)
