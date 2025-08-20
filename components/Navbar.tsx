import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
        <header className="w-full flex flex-col sm:flex-row justify-between items-center px-8 py-4 border-b  gap-4">
        <Link href={"/"} className="text-xl font-bold" >HealthScan</Link>
        <nav className="flex gap-6">
          <Link href="/scan/eye-detector" className='hover:bg-gray-800 p-2 rounded-2xl'>Eye Detector</Link>
          <Link href="/scan/report-detector" className='hover:bg-gray-800 p-2 rounded-2xl'>Reports</Link>
          <Link href="#" className='hover:bg-gray-800 p-2 rounded-2xl'>Assistance</Link>
          <Link href="#" className='hover:bg-gray-800 p-2 rounded-2xl'>About Us</Link>
        </nav>
        <div className="flex gap-3">
          <Button variant="outline">Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </header>
    </div>
  )
}

export default Navbar