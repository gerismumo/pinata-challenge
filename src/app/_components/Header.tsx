"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const Header:React.FC = () => {
    const router = useRouter()
  return (
    <div className="flex flex-col w-full shadow-sm py-[20px] px-[20px]">
        <div className="flex flex-row items-center justify-between">
            <div className="cursor-pointer" onClick={() => router.push("/")}>
                <h1 className='text-[20px] font-[600]'>SafeKeep</h1>
            </div>
            <div className="flex flex-row items-center gap-[20px]">
                <Link href="/">Home</Link>
                <Link href="/reports">Reports</Link>
                <Link href="/auth/signin" className="px-[20px] py-[8px] rounded-[8px] bg-black text-white text-nowrap">Get Started</Link>
            </div>
        </div>
    </div>
  )
}

export default Header