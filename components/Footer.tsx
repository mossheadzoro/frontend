import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div><footer className="mt-12 border-t px-6 py-8 flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
        <div className="flex gap-6 mb-4 md:mb-0">
          <Link href="#">About Us</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
        <p>© 2024 HealthScan. All rights reserved.</p>
      </footer></div>
  )
}

export default Footer