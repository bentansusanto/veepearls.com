'use client'

import { body } from '@/components/ui/font-family'
import { Hammer, Mail } from 'lucide-react'

export default function MaintenancePage() {
  return (
    <div
      className={`min-h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden ${body.className}`}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* Icon Animation */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-purple-600 rounded-2xl rotate-6 opacity-20 animate-pulse" />
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
            <Hammer className="w-10 h-10 text-amber-400" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Under Maintenance
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-lg mx-auto leading-relaxed">
            We're currently crafting a better experience for you.
            <br className="hidden md:block" />
            Please check back soon for our new look.
          </p>
        </div>

        {/* Progress Indicator (Decorative) */}
        <div className="w-full max-w-xs mx-auto h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500 via-purple-500 to-blue-500 w-2/3 animate-[shimmer_2s_infinite]" />
        </div>

        {/* Contact/Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:contact@veepearl.com"
            className="group relative px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center gap-2 text-sm font-medium"
          >
            <Mail className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            <span>Contact Support</span>
          </a>

          {/* Optional: Add social or other links here */}
        </div>
      </div>

      <footer className="absolute bottom-8 text-center w-full">
        <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold">
          VeePearl &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
