'use client'

import { useState } from 'react'
import { useRouter } from 'next/router';
import useFetch from '../../../hooks/useFetch';
import { format } from 'date-fns';

export default function ExpenseList() {
    const router = useRouter();
  const { groupId } = router.query;
  const [fetchTrigger,setFetchTrigger] = useState(false);

  const { data, error, loading } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/expense/getExpense/${groupId}`,{},fetchTrigger);

  console.log(loading);
  console.log(error);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const handleUndo = (id) => {
    const expenseToUndo = expenses.find(expense => expense.id === id)
    if (expenseToUndo) {
      setTotalAvailable(prev => prev + expenseToUndo.amount)
      setExpenses(expenses.filter(expense => expense.id !== id))
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Expense Summary</h2>
        <div className="flex justify-between mb-2">
          <span className="font-medium">Total Expenses:</span>
          <span className="text-red-600 font-bold">Rs. {data?.totalAmount ? data.totalExpense.toFixed(2) : "0.00"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Total Available:</span>
          <span className="text-green-600 font-bold">Rs. {data?.totalAmount ? data.totalAmount.toFixed(2) : "0.00"}</span>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
          {data?.expenseDtoResponses && data.expenseDtoResponses.length > 0 ? (
            data.expenseDtoResponses.map((expense) => (
            <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">Rs. {expense.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(expense.createdAt)}
                </td>
            </tr>
            ))
        ) : (
            <tr>
                <td colSpan="3" className="text-center px-6 py-4">
                No expenses available.
                </td>
            </tr>
)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

