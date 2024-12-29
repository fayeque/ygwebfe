'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router';

export default function CollectionGroupForm() {
  const [groupName, setGroupName] = useState('')
  const [collectionType, setCollectionType] = useState('MONTHLY')
  const [collectionAmount, setCollectionAmount] = useState('')
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    console.log('Form submitted:', { groupName, collectionType, collectionAmount });

    var requestData = {
        groupName,
        collectionType,
        collectionAmount
    }

    try {
        const token = localStorage.getItem('jwtToken'); // Get the token from localStorage or other storage
        console.log("token here " , token);
        if (!token) {
          throw new Error('No JWT token found');
        }
        // Simulating a submission that changes the server data
        console.log("requestdata here ",requestData);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/addGroup`, {
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }    
        });

        router.push("/"); 
      } catch (err) {
        console.error('Failed to update data:', err);
      }
    // In a real app, you'd send this data to your backend or perform other actions
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Collection Group
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">
                Group Name
              </label>
              <div className="mt-1">
                <input
                  id="groupName"
                  name="groupName"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="collectionType" className="block text-sm font-medium text-gray-700">
                Collection Type
              </label>
              <div className="mt-1">
                <select
                  id="collectionType"
                  name="collectionType"
                  required
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={collectionType}
                  onChange={(e) => setCollectionType(e.target.value)}
                >
                  <option value="MONTHLY">Monthly</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="DAILY">Daily</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="collectionAmount" className="block text-sm font-medium text-gray-700">
                Collection Amount
              </label>
              <div className="mt-1">
                <input
                  id="collectionAmount"
                  name="collectionAmount"
                  type="number"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={collectionAmount}
                  onChange={(e) => setCollectionAmount(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

