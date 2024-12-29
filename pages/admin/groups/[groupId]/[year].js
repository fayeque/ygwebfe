"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import useFetch from '../../../../hooks/useFetch';
import Link from 'next/link';
// import AdminRoute from '../../../../components/AdminRoute';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"



const months = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
]

const groupMembers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
  { id: 4, name: "Bob Williams" },
]

const GroupAttendance= ({setGroupId}) => {

  const [fetchTrigger, setFetchTrigger] = useState(0); 
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [status, setStatus] = useState("PAID");
  const [yearFetched,setYearFetched] = useState(new Date().getFullYear());
  const [requestData,setRequestData] = useState({
    transactionId:0,
    username:"",
    groupId:null,
    year:null,
    amount:null,
    transactionPeriod:"",
    status:""
  });

  const { query, isReady } = useRouter();

  const { groupId, year } = query; // groupId might be undefined initially

  const fetchUrl = groupId
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/group/getGroupMembersForAdmin/${groupId}/${yearFetched}`
    : null;

  
  const { data, error, loading } = useFetch(fetchUrl,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    }},fetchTrigger);

  // useEffect(() => {
  //   setGroupId(groupId);
  // },[]);

  if (!isReady) {
    return <p>Loading group data...</p>;
  }

  console.log(loading);
  console.log(error);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;




  const handleCheckboxClick = (memberUsername, month,transactionId) => {
    console.log("status here is ",status);
    console.log("transactionId here is ",transactionId);
    setRequestData({...requestData,username:memberUsername,transactionPeriod:month,transactionId:transactionId})
    setIsModalOpen(true)
  }

  const handleSubmit = async () => {
    console.log(`Member ${requestData.username} for ${requestData.transactionPeriod}: ${status}`)
    console.log("status here in handleSubmit ",status);
    // setRequestData({...requestData,status:status,groupId:groupId,year:data.year,amount:data.amount});
    requestData.status=status.toUpperCase();
    requestData.groupId=groupId;
    requestData.year=data.year;
    if(status.toUpperCase() == "ABSENT"){
        console.log("inside Absent");
        requestData.amount=0;
    }else{
        requestData.amount=data.amount;
    }
    console.log(requestData);
    try {
        const token = localStorage.getItem('jwtToken'); // Get the token from localStorage or other storage
        console.log("token here " , token);
        if (!token) {
          throw new Error('No JWT token found');
        }
        // Simulating a submission that changes the server data
        console.log("requestdata here ",requestData);
        await fetch('`${process.env.NEXT_PUBLIC_API_URL}/api/transaction/addTransactionForMember', {
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        // Increment fetchTrigger to re-fetch data
        setFetchTrigger((prev) => prev + 1);
      } catch (err) {
        console.error('Failed to update data:', err);
      }
    setIsModalOpen(false)
    setStatus("");
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{data?.groupName || "Loading..."}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Select value={yearFetched} onValueChange={setYearFetched}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {["2023", "2024", "2025"].map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm font-medium">Total Collection: {data?.totalAmount || "Loading..."}</p>
            </div>
            <div className="flex space-x-4">
              <Link href={`/admin/groups/${groupId}/addExpense`}>
                <Button variant="outline">Add Expenses</Button>
              </Link>
              <Link href={`/admin/groups/${groupId}/expense`}>
                <Button variant="outline">View Expenses</Button>
              </Link>
              <Link href={`/admin/groups/${groupId}/addContribution`}>
                <Button variant="outline">Add Contribution</Button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky  w-[10rem] min-w-[10rem] left-0 z-10 bg-white">Name</TableHead>
                  {months.map((month) => (
                    <TableHead key={month} className="min-w-[100px]">{month}</TableHead> 
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.memberDtoResponses?.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="sticky w-[10rem] min-w-[10rem] left-0 z-10 bg-white">
                      {member.name.toUpperCase()} 
                      <div className="text-sm text-gray-500">
                        {new Date().getMonth() + 1 - member.transactionDtoResponse.length} Months
                      </div>
                    </TableCell>
                    {months.map((month) => {
                      const transaction = member.transactionDtoResponse.find(
                        (t) => t.transactionPeriod.toUpperCase() === month
                      )
                      return (
                        <TableCell key={`${member.id}-${month}`}>
                          {transaction ? (
                            transaction.status.toUpperCase() === 'PAID' ? (
                              <Checkbox
                                checked={true}
                                onCheckedChange={() => handleCheckboxClick(member.username, month, transaction.id)}
                              />
                            ) : (
                              <span
                                className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-500 font-medium text-xs cursor-pointer"
                                onClick={() => handleCheckboxClick(member.username, month, transaction.id)}
                              >
                                A
                              </span>
                            )
                          ) : (
                            <Checkbox
                              checked={false}
                              onCheckedChange={() => handleCheckboxClick(member.username, month, 0)}
                            />
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
          </DialogHeader>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PAID">PAID</SelectItem>
              <SelectItem value="ABSENT">ABSENT</SelectItem>
              <SelectItem value="REVERT">REVERT</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default GroupAttendance;

