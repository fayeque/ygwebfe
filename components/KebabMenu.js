'use client'

import { useState, useRef, useEffect } from 'react'
import { MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function KebabMenu({isAdminRoute,groupId}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null);
  const router = useRouter();

  console.log("groupId in kebab ",groupId);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleOptionClick = (option) => {
    console.log(`Selected option: ${option}`)
    if(option == "Add group"){
        router.push("/admin/addGroup")
    }else if(option == "Add member to a Group"){
        router.push(`/admin/groups/${groupId}/addMember`);
    }else{
      router.push(`/admin/groups/${groupId}/addRole`);
    }
    setIsOpen(false)
    // Here you would typically handle the action for each option
  }

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label="Menu"
      >
        <MoreVertical className="h-6 w-10 text-white-600" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            
            {isAdminRoute ? (['Add group', 'Add member to a Group', 'Add admin Role'].map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {option}
              </button>
            ))) : (['Add group'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {option}
                </button>
              )))}
          </div>
        </div>
      )}
    </div>
  )
}

