"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <Hero/>

      {/* Features */}
      <Features/>

      {/* Call to Action */}
      <section className="text-center py-16 bg-muted rounded-xl mx-6">
        <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Health?</h3>
        <Button size="lg">Sign Up Now</Button>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
