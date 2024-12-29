'use client'

import { useState, FormEvent,useEffect } from 'react'
import { useRouter } from 'next/router';

export default function UsernameForm() {
  const [username, setUsername] = useState('')
    const router = useRouter();
    const { groupId } = router.query;
    const [error,setError] = useState(null);

      useEffect(() => {
        if (error) {
          const timer = setTimeout(() => {
            setError('')
          }, 5000) // Error message will disappear after 5 seconds
      
          return () => clearTimeout(timer)
        }
      }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Username submitted:', username)
    // Reset the input after submission
    var requestData = {
        username,
        groupId:groupId
    }

    try {
        const token = localStorage.getItem('jwtToken'); // Get the token from localStorage or other storage
        console.log("token here " , token);
        if (!token) {
          throw new Error('No JWT token found');
        }
        // Simulating a submission that changes the server data
        console.log("requestdata here ",requestData);
        const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/addRoleToGroup`, {
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        
        });
        var result = response.json();
        console.log("result here " , response.status);
        if(response.status == '404'){
            setError('Role not given');
          }else{
            router.push(`/admin/groups/${groupId}/${new Date().getFullYear()}`); 
          }
      } catch (err) {
        console.error('Failed to update data:', err);
      }
    setUsername('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Enter Username
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

