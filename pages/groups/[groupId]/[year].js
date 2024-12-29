'use client'

import React, { useState } from "react";
import { useRouter } from 'next/router';
import useFetch from '../../../hooks/useFetch';
import Link from 'next/link'
import { CheckIcon, XIcon } from 'lucide-react'


const GroupRegister = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

   const [yearFetched,setYearFetched] = useState(new Date().getFullYear());
    const [fetchTrigger, setFetchTrigger] = useState(0); 
  const { query, isReady } = useRouter();
  const { groupId, year } = query;

  const fetchUrl = groupId
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/group/getGroupMembers/${groupId}/${yearFetched}`
    : null;

  
  const { data, error, loading } = useFetch(fetchUrl,{},fetchTrigger);

  if (!isReady) {
    return <p>Loading group data...</p>;
  }


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 max-w-7xl">
        <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Select Year</h2>
            <select
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={yearFetched}
              onChange={(e) => setYearFetched(e.target.value)}
              aria-label="Select attendance status"
            >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            </select>
       </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 text-white p-3">
          {/* <h1 className="text-3xl font-bold mb-2">{data?.groupName ? data.groupName : "Loading..."}</h1> */}
          <p className="text-sm">Total Collection: {data?.totalAmount ? data.totalAmount : "Loading..."}</p>
        </div>

        {/* Register Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 w-[10rem] min-w-[10rem] text-left sticky left-0 bg-gray-100 z-10 truncate">Member Name</th>
                {months.map(month => (
                  <th key={month} className="p-3 text-center">{month}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            {data?.memberDtoResponses ? (
    data.memberDtoResponses.map((member, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-3 w-[10rem] min-w-[10rem] sticky left-0 bg-inherit z-10 font-medium truncate">
                  <div className="font-medium">{member.name.toUpperCase()}</div>
                    <div className="text-sm text-gray-500">
                    {new Date().getMonth() + 1-member.transactionDtoResponse.length} Months
                    </div>
                  </td>
                  {months.map((month) => {
                     // Check if a transaction exists for the current month
                     const filteredTransactions = member.transactionDtoResponse.filter(
                    (transaction) => transaction.transactionPeriod.toUpperCase() === month.toUpperCase()
                    );
                   
                  if (filteredTransactions.length > 0) {
                    if(filteredTransactions[0].status.toUpperCase() == 'PAID'){
                      return (
                        <td key={`${member.id}-${month}`} className="border px-4 py-2">
                           <CheckIcon className="inline-block w-6 h-6 text-green-500" />
                        </td>
                      );
                      }else{
                          return (
                          <td key={`${member.id}-${month}`} className="border px-4 py-2">
                              <span className="text-gray-500 font-bold text-lg">A</span>
                            </td>);
                      }
                  }else{
                    return (
                    <td className="p-3 text-center">
                       <XIcon className="inline-block w-6 h-6 text-red-500" />
                    </td>
                    );
                  }
                })}
                </tr>
              )))
              : (
                <tr>
                  <td className="text-center py-2">
                    Loading or no data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Show Expenses Button */}
        <div className="p-6">
        <Link href={`/groups/${groupId}/expense`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
            Show Expenses
          </button>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default GroupRegister

