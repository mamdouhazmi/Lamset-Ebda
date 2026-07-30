'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WhyUs from '@/components/WhyUs'
import Services from '@/components/Services'
import Process from '@/components/Process'
import BeforeAfter from '@/components/BeforeAfter'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import BookingCTA from '@/components/BookingCTA'
import FAQ from '@/components/FAQ'
import ServiceArea from '@/components/ServiceArea'
import Footer from '@/components/Footer'

const queryClient = new QueryClient()

function Home() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <Hero />
      <WhyUs />
      <Services />
      <Process />
      <BeforeAfter />
      <Gallery />
      <Testimonials />
      <BookingCTA />
      <FAQ />
      <ServiceArea />
      <Footer />
    </div>
  )
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Home />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}
