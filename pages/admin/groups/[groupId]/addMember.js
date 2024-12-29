'use client'

import { useState, FormEvent,useEffect } from 'react'
import { useRouter } from 'next/router';

export default function UserRegistrationForm() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error,setError] = useState(null);
  const router = useRouter();
  const { groupId } = router.query;

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
    console.log('Form submitted:', { name, username, email });

    var requestData = {
        name,
        username,
        email,
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
        const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/member/addMember`, {
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
            setError('User already Exist');
          }else{
            router.push(`/admin/groups/${groupId}/${new Date().getFullYear()}`); 
          }
      } catch (err) {
        console.error('Failed to update data:', err);
      }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
        {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
        </div>
        )}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          User Registration
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
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

