'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import KebabMenu from './KebabMenu'

export default function Header({isAdminRoute,groupId}) {
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth();

  console.log("Add group ",isAdminRoute);


  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-xl font-bold hover:text-white-300">
          Young Generation
        </Link>
        {/* <div
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        > */}
          {isLoggedIn ? (
              <>
              <div>
              <KebabMenu isAdminRoute={isAdminRoute} groupId={groupId} />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
              </div>
              </>
            ) : (
              <a  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/login">Login</a>
            )} 
        {/* </div> */}

      </div>
    </header>
  )
}

