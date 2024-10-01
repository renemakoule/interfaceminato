'use client'

import { useState, useEffect } from 'react'
import { Search, ChevronUp, User2Icon, LogInIcon, UserIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LogoMinato from './LogoMinato'
import Link from 'next/link'

export default function MinatoSearch() {

    const placeholders = [
        "Search for anything...",
        "What's on your mind?",
        "Discover new ideas",
        "Find answers here"
      ]
      const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
      const [isAnimating, setIsAnimating] = useState(false)
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          setIsAnimating(true)
          setTimeout(() => {
            setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length)
            setIsAnimating(false)
          }, 500) // Half of the transition duration
        }, 4000)
    
        return () => clearInterval(intervalId)
      }, [])


      const [gradient, setGradient] = useState('from-blue-500 to-purple-500')

    useEffect(() => {
        const gradients = [
            'from-blue-500 via-pink-500 to-purple-500',
            'from-green-600 via-purple-600 to-blue-600',
            'from-pink-500 to-yellow-500 via-red-500'
        ]
        let index = 0
        const intervalId = setInterval(() => {
            index = (index + 1) % gradients.length
            setGradient(gradients[index])
        }, 8000)
        return () => clearInterval(intervalId)
    }, [])


  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <LogoMinato />
              </div>
            </div>
            <div className="flex items-center">
            <Link href="/" className='flex hover:text-purple-700'>
              <UserIcon className='cursor-pointer hover:text-purple-700'/>
               Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="pt-28 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className={`text-[68px] font-bold font-mono mb-8 bg-gradient-to-r ${gradient} text-transparent bg-clip-text transition-colors duration-1000`}>Minato.ai</h1>
          <div className="relative max-w-2xl w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              type="text" 
              placeholder= {placeholders[currentPlaceholder]} 
              className="pl-10 pr-4 py-6 w-full rounded-full border-2 border-purple-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <span className="bg-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm">best tacos in sf</span>
            <span className="bg-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm">what is there to do in austin tx</span>
            <span className="bg-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm">is it worth upgrading to the iphone 16 pro?</span>
          </div>
          <footer className="mt-28 flex flex-col items-center justify-center text-gray-600">
            <span className='mt-2'>Powered By Minato.ai © 2024</span>
            <div className='mt-2'>
            <LogoMinato />
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}