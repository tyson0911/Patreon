"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateProfile } from "@/actions/useractions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";


const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setform] = useState({});

  useEffect(() => {
    getData()
    if (!session) {
      router.push("/login");
    }
  }, [router, session]);



  const getData = async () => {
    let u = await fetchUser(session.user.name)
    setform(u)
  }


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e)=> {
    update()
    let a = await updateProfile(e , session.user.name)
    toast('🦄 Wow so easy!', {
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
      router.push(`/${session.user.name}`)


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
    <div className="container mx-auto py-5">
      <h1 className="text-center text-3xl my-5 font-bold">
        Welcome to your Dashboard
      </h1>
      <form  action={handleSubmit} className="max-w-2xl mx-auto">
        {/* input for name */}
        <div className="my-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            value={form.name ? form.name : ""}
            autoComplete="on"
            onChange={handleChange}
            name="name"
            id="name"
            type="text"
            className="block w-full text-gray-900 p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-700 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* input for email */}
        <div className="my-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            value={form.email ? form.email : ""}
            onChange={handleChange}
            name="email"
            id="email"
            type="text"
            className="block w-full text-gray-900 p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-700 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* input for username */}
        <div className="my-2">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            value={form.username ? form.username : ""}
            onChange={handleChange}
            name="username"
            id="username"
            type="text"
            className="block w-full text-gray-900 p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-700 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* input for profilepic */}
        <div className="my-2">
          <label
            htmlFor="profilepic"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            profilepic
          </label>
          <input
            value={form.profilepic ? form.profilepic : ""}
            onChange={handleChange}
            name="profilepic"
            id="profilepic"
            type="text"
            className="block w-full text-gray-900 p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-700 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* input for coverpic pciture */}
        <div className="my-2">
          <label
            htmlFor="coverpic"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            coverpic
          </label>
          <input
            value={form.coverpic ? form.coverpic : ""}
            onChange={handleChange}
            name="coverpic"
            id="coverpic"
            type="text"
            className="block w-full text-gray-900 p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-700 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* input for razorpay id*/}
        <div className="my-2">
          <label
            htmlFor="razorpayid"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Razorpay ID
          </label>
          <input
            value={form.razorpayid ? form.razorpayid : ""}
            onChange={handleChange}
            name="razorpayid"
            id="razorpayid"
            type="text"
            className="block w-full text-gray-900 p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-700 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* input for razorpay secret  */}
        <div className="my-2">
          <label
            htmlFor="razorpaysecret"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Razorpay Secret
          </label>
          <input
            value={form.razorpaysecret ? form.razorpaysecret : ""}
            onChange={handleChange}
            name="razorpaysecret"
            id="razorpaysecret"
            type="text"
            className="block w-full text-gray-900 p-2 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-700 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* submit btn  */}
        <div className="my-6">
          <button onClick={handleSubmit} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Submit
            </span>
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Dashboard;
