'use client'

import { useState } from 'react'
import { useRouter } from 'next/router';
import useFetch from '../../../../hooks/useFetch';
import AdminRoute from '../../../../components/AdminRoute';

const ExpenseList = () => {
    const router = useRouter();
  const { groupId } = router.query;
  const [fetchTrigger,setFetchTrigger] = useState(false);

  

  const { data, error, loading } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/expense/getExpense/${groupId}`,{},fetchTrigger);

  console.log(loading);
  console.log(error);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const handleUndo = async (id) => {
  try {
      const token = localStorage.getItem('jwtToken'); // Get the token from localStorage or other storage
      console.log("token here " , token);
      if (!token) {
        throw new Error('No JWT token found');
      }
      // Simulating a submission that changes the server data
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/expense/undoExpense/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      
      });
      setFetchTrigger((prev) => prev + 1);
    } catch (err) {
      console.error('Failed to update data:', err);
    }
  }

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
          {data?.expenseDtoResponses && data.expenseDtoResponses.length > 0 ? (
            data.expenseDtoResponses.map((expense) => (
            <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">Rs. {expense.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                <button
                    onClick={() => handleUndo(expense.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                >
                    Undo
                </button>
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

export default ExpenseList;
