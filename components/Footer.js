import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='bg-gray-900 text-white flex justify-center items-center px-4 h-20'>
      <p className='text-center'>Copyright &copy; {currentYear} Get me a chai | All rights reserved</p>
    </footer>
  )
}

export default Footer
