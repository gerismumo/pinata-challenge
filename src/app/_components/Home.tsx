import React from 'react'
import Header from './Header'
import Link from 'next/link'
import Image from 'next/image'

type Props = {}

const Page:React.FC = () => {
  return (
    <>
    <Header/>
    <div className="container py-[30px] flex flex-col">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[40px]">
            <div className="flex flex-col gap-[30px]">
                <h1 className='text-[30px] font-[700]'>Keep Your Future Safe, Wherever You Are</h1>
                <p>With SafeKeep, you can securely store and access your essential documents from anywhere in the world, whether you're on the move or resettling in a new country. Our platform allows you to safely share important files like IDs, medical records, and diplomas with trusted organizations and aid agencies. Stay in control of your future by ensuring your documents are always secure and accessible, whenever you need them.</p>
                <Link href="" className="px-[20px] py-[8px] rounded-[8px] bg-black text-white w-fit">Get Started</Link>
            </div>
            <div className="relative w-[500px] h-[400px] shrink-0">
                <Image src="/home.jpeg" fill alt=''/>
            </div>
        </div>
    </div>
</>
  )
}

export default Page