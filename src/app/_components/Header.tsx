import Link from 'next/link'
import React from 'react'

type Props = {}

const Header:React.FC = () => {
  return (
    <div className="flex flex-col w-full shadow-sm py-[20px] px-[20px]">
        <div className="flex flex-row items-center justify-between">
            <div className="">
                <h1 className='text-[20px] font-[600]'>SafeKeep</h1>
            </div>
            <div className="flex flex-row items-center gap-[30px]">
                <Link href="">About</Link>
                <Link href="">Services</Link>
                <Link href="" className="px-[20px] py-[8px] rounded-[8px] bg-black text-white">Get Started</Link>
            </div>
        </div>
    </div>
  )
}

export default Header