"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const DashBoardHeader = () => {
    const router = useRouter()
  return (
    <div className="flex flex-col w-full shadow-sm py-[20px] px-[20px]">
        <div className="flex flex-row items-center justify-between">
            <div className="cursor-pointer" onClick={() => router.push("/")}>
                <h1 className='text-[20px] font-[600]'>SafeKeep</h1>
            </div>
            <div className="flex flex-row items-center gap-[20px]">
                <button  className="px-[20px] py-[8px] rounded-[8px] bg-black text-white text-nowrap">Logout</button>
            </div>
        </div>
    </div>
  )
}

export default DashBoardHeader