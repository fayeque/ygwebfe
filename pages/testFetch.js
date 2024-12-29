'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUpPage() {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();

  useEffect(() => {
    const dorequest = async () => {
        console.log("Inside test fetch");
        try{
        const response = await fetch("http://100.76.173.30:8094/digx-payments/payment/v1/payments/pay/network?locale=en", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-IN,en;q=0.9,en-US;q=0.8,hi;q=0.7",
          "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBTlVNQUtFUiIsImxuIjoiQURGIiwicm9sZSI6ImNvcnBvcmF0ZXVzZXIiLCJpaWQiOiJDN2dFemdoTWxuV3JVVkJqV2x5YXdXR3AzSWVqWlQiLCJkb2IiOiIyMDAwMDEwMTAwMDAwMCIsImZuIjoiQURTRiIsImlhc3QiOiIxODAwMDAwIiwiZXhwIjoxNzMzODE0NDE3LCJpYXQiOjE3MzM4MTE0MTcsImFwIjoiQVBJTlRFUk5FVCJ9.sjcL2NpKSe-_u7TbkSlCgFpKUlQwhLkbwepMIAQml5I",
          "content-type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          "x-target-unit": "OBDX_BU",
          "x-token-type": "JWT",
          "cookie": "secretKey=ry5sczWZRrglRfUEAVvFy4qNMS35OYiO",
          "Referer": "http://100.76.173.30:8094/home.html?page=flow-generic-money-transfer&generic-money-transfer=generic-money-transfer-review",
          "Referrer-Policy": "no-referrer-when-downgrade"
        },
        "body": "{\"partyId\":{},\"amount\":{\"currency\":\"USD\",\"amount\":14},\"remarks\":\"OK\",\"debitAccountId\":{\"displayValue\":\"000000003133\",\"value\":\"101@~000000003133\"},\"adhocPayment\":false,\"accountType\":\"CSA\",\"paymentType\":\"SELF\",\"paymentDate\":\"2025-03-19T00:00:00\",\"charges\":\"O\",\"chargesAccount\":{},\"network\":\"SELF\",\"beneficiary\":[{\"creditAccount\":{\"value\":\"101@~111111111111\"},\"accountType\":\"CSA\"}],\"currencyOfTransfer\":null,\"otherDetails\":{\"line1\":null,\"line2\":null,\"line3\":null,\"line4\":null},\"documentsList\":[],\"questionDTO\":[],\"currencyExchange\":{\"sourceCurrency\":\"AED\",\"targetCurrency\":\"USD\",\"instructedAmount\":{}},\"paymentChargeDetails\":[],\"dictionaryArray\":[{\"nameValuePairDTOArray\":[{\"name\":\"TransactionType\",\"value\":\"LDL\",\"genericName\":\"com.ofss.digx.cz.uae.domain.payment.entity.network.NetworkPayment.TransactionType\"},{\"name\":\"BuyCurrency\",\"value\":\"AED\"},{\"name\":\"SellCurrency\",\"value\":\"USD\"}]}],\"systemReferenceId\":\"PC53649732134222\"}",
        "method": "POST"
      });
      console.log("data here is before");
        var result = response.json();
        console.log("data here is ",result);
    
    }catch(err){
    console.log("error while ",err);
    }
}
    dorequest();
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the sign-up logic
    console.log('Sign-up attempted with:', { username, name, password })
    // For demonstration, we'll just log the attempt
    // In a real app, you'd validate inputs, create the user, and handle the sign-up process
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
    </div>
  )
}

