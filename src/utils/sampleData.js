const today = new Date()
const day = (offset) => {
  const d = new Date(today)
  d.setDate(d.getDate() - offset)
  return d.toISOString().slice(0, 10)
}
export const sampleTransactions = [
  { id: 't1', title: 'Monthly Salary', amount: 40000, type: 'income', category: 'Salary', date: day(2), paymentMethod: 'Bank Transfer', description: 'Monthly salary' },
  { id: 't2', title: 'Grocery Shopping', amount: 2000, type: 'expense', category: 'Food', date: day(1), paymentMethod: 'UPI', description: 'Weekly groceries' },
  { id: 't3', title: 'Electricity Bill', amount: 1500, type: 'expense', category: 'Bills', date: day(4), paymentMethod: 'UPI', description: '' },
  { id: 't4', title: 'Freelancing', amount: 10000, type: 'income', category: 'Freelancing', date: day(7), paymentMethod: 'Bank Transfer', description: 'Website project' },
  { id: 't5', title: 'Transportation', amount: 1000, type: 'expense', category: 'Transportation', date: day(3), paymentMethod: 'Cash', description: '' },
  { id: 't6', title: 'Movie Night', amount: 650, type: 'expense', category: 'Entertainment', date: day(8), paymentMethod: 'Card', description: '' },
  { id: 't7', title: 'Online Course', amount: 1200, type: 'expense', category: 'Education', date: day(11), paymentMethod: 'UPI', description: '' },
  { id: 't8', title: 'Gift', amount: 2000, type: 'income', category: 'Gift', date: day(14), paymentMethod: 'UPI', description: '' },
  { id: 't9', title: 'Pharmacy', amount: 450, type: 'expense', category: 'Healthcare', date: day(17), paymentMethod: 'Cash', description: '' },
]
export const expenseCategories = ['Food', 'Shopping', 'Transportation', 'Education', 'Entertainment', 'Healthcare', 'Bills', 'Travel', 'Other']
export const incomeCategories = ['Salary', 'Freelancing', 'Business', 'Investments', 'Gift', 'Other']
