"use client";
import React  from "react";
import Script from "next/script";
import { fetchPayments, initiate } from "@/actions/useractions";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUser } from "@/actions/useractions";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";
import { notFound } from "next/navigation";


const PaymentPage = ({username}) => {
  
  
  const [paymentform, setpaymentform] = useState({name: "", message: "", amount: ""})  
  const [currentuser, setcurrentuser] = useState({})
  const [payment, setpayment] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()


  useEffect(() => {
    getData()

  }, [])

  useEffect(() => {
    if(searchParams.get("paymentdone") == true){
      toast('Donate karne ke liye Shukriya!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
      router.push(`/${username}`)
  }, [])
  

  

  const handleChange = (e) => {
      setpaymentform({...paymentform, [e.target.name]: e.target.value})
  }

  const getData = async () => {
      let u = await fetchUser(username)
      setcurrentuser(u)
      let dbpayments = await fetchPayments(username)
      setpayment(dbpayments)
  }

    const pay = async (amount) => {
        let a = await initiate(amount, username ,paymentform)
        let orderID = a.id
        var options = {
            "key": currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Chai laa do koi", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
    rzp1.open();

}
    
  return (
    <>
          <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      
      <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
   

      <div className='cover w-full relative'>
        <img className='object-cover w-full h-[350px]' src={currentuser.coverpic} alt="" />
        <div className='absolute -bottom-20 right-[47%] size-36 overflow-hidden'>
          <img className='rounded-full object-cover size-36' height={128} width={128} src={currentuser.profilepic} alt="" />
        </div> 
      </div>
      <div className="info flex justify-center flex-col gap-2 items-center my-24">
        <div className='font-bold text-lg'>

          @{username}
        </div>
        <div className='text-slate-500'>
            Lets help {username} and buy him a chai 
        </div>
        <div className='text-slate-500'>
            {payment.length} Payments . ₹{payment.reduce((a,b) => a+b.amount , 0)} raised .  
        </div>

        <div className="payment mt-11 flex w-[80%] gap-3">
          <div className="supporters   bg-slate-900 p-10 rounded-lg text-white w-1/2">
            <h2 className='text-2xl  my-5 font-bold'>Supporters</h2>
              <ul className='mx-5 '>
                {payment.length == 0 && <li>No payments yet</li>}
                {payment.map((p,i)=>{
                  return <li key={i} className="my-4 flex gap-2 items-center">
                
                
                    <img src="avatar.gif" width={33} alt="user avatar" />
                    <span>{p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"</span>
                    </li>
                  })}
              </ul>
          </div>

          <div className="makepayment rounded-lg text-white p-10 bg-slate-900 w-1/2">
            <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
            <div className='flex flex-col gap-2'>
               <input type="text" onChange={handleChange} value={paymentform.name} name="name" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
               <input type="text" onChange={handleChange} value={paymentform.message} name="message" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
               <input type="text" onChange={handleChange} value={paymentform.amount} name="amount" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
               <button type="button" onClick={()=> pay(paymentform.amount)} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-cyan-100" disabled={paymentform.name?.length<3 || paymentform.message?.length<4 || paymentform.amount?.length<1}>Pay</button>
            </div>
            <div className="flex gap-2 mt-5">
              <button className='bg-slate-800 p-3 rounded-lg' onClick={()=> pay(1000)}>Pay ₹10</button>
              <button className='bg-slate-800 p-3 rounded-lg' onClick={()=> pay(2000)}>Pay ₹20</button>
              <button className='bg-slate-800 p-3 rounded-lg' onClick={()=> pay(3000)}>Pay ₹30</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;