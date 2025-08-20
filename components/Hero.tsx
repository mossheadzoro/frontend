import { Button } from '@/components/ui/button'
import React from 'react'

const Hero = () => {
  return (
    <div>
        <section
  className="relative flex flex-col items-center justify-center text-center px-6 py-20 rounded-xl mx-6 mt-8 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/Hero.png')" }}
>
  {/* Overlay to make text readable */}
  <div className="absolute inset-0 bg-black/50 rounded-xl" />

  {/* Content goes on top of overlay */}
  <div className="relative z-10">
    <h2 className="text-4xl font-bold mb-4 text-white">
      Your Health, Simplified
    </h2>
    <p className="text-lg mb-6 text-white">
      Get personalized health insights with our AI-powered daily scans and expert medical analysis.
    </p>
    <Button size="lg">Get Started</Button>
  </div>
</section>

    </div>
  )
}

export default Hero