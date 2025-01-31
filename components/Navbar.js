"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [showdropdown, setshowdropdown] = useState(false);

  return (
    <nav className="bg-gray-900 text-white flex items-center justify-between px-4 h-16">
      <Link
        className="logo font-bold text-lg gap-2 flex justify-center items-center "
        href="/"
      >
        <img className="invertImg" src="tea.png" width={44} alt="" />
        <span>Get me a chai</span>
      </Link>
      {/* <ul className="flex justify-between gap-4">
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Signup</li>
            <li>Login</li>
        </ul> */}
      <div className="relative">
        {session && (
          <>
            <button
              onClick={() => setshowdropdown(!showdropdown)}
              onBlur={() =>
                setTimeout(() => {
                  setshowdropdown(false);
                }, 100)
              }
              id="multiLevelDropdownButton"
              data-dropdown-toggle="multi-dropdown"
              className="mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Welcome {session.user.email}{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="multi-dropdown"
              className={`z-10 ${
                showdropdown ? "" : "hidden"
              } absolute left-[125px]  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="multiLevelDropdownButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    onClick={router.push("/dashboard")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.name}`}
                    onClick={router.push(`/${session.user.name}`)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    YOUR PAGE
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    onClick={router.push("/login")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
        {/* {session && <Link href={"/dashboard"}><button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-b1 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Dashboard</button></Link>} */}
        {session && (
          <button
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-b1 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        )}
        {!session && (
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
