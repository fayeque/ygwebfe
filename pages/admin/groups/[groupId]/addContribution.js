'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router';
import AdminRoute from '../../../../components/AdminRoute';

const ContributionForm = () => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter();
  const { groupId } = router.query;
  console.log("groupId here " + groupId);

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Submitted:', { amount, description });
    var requestData = {
        amount,
        description,
        groupId
    }
    try {
        const token = localStorage.getItem('jwtToken'); // Get the token from localStorage or other storage
        console.log("token here " , token);
        if (!token) {
          throw new Error('No JWT token found');
        }
        // Simulating a submission that changes the server data
        console.log("requestdata here ",requestData);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/addcontribution`, {
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        
        });
        router.push(`/admin/groups/${groupId}/${new Date().getFullYear()}`); 
      } catch (err) {
        console.error('Failed to update data:', err);
      }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Contribution Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContributionForm;

