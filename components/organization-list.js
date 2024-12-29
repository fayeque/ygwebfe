'use client'

import { useState } from 'react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"



export default function OrganizationList({ groups }) {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Groups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center">{group.groupName}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaaFdS-cW8X-JNil8_3VZRRhPmFHday9REAQ&s"
                alt={`${group.groupName} logo`}
                width={100}
                height={100}
                className="mb-4 rounded-full"
              />
              <p className="text-sm text-gray-600 mb-2">Total Members: {group.totalMembers}</p>
              <p className="text-sm font-semibold">Available Amount: Rs. {group.totalAmount.toLocaleString()}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
			  <Link href={`/groups/${group.groupId}/2024`}>
				<Button variant="outline" className="flex-1 mr-2">View as Member</Button>
			  </Link>
			  <Link href={`/admin/groups/${group.groupId}/2024`}>
              <Button variant="default" className="flex-1 ml-2">View as Admin</Button>
			  </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


  

