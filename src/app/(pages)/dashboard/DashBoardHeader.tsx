"use client"

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

type Props = {
    user: any
}

const DashBoardHeader:React.FC<Props> = ({user}) => {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const response = await axios.post('/api/logout');
            
            if (response.data.success) {
                toast.success(response.data.message);
                router.push('/');
            } else {
                toast.error('Failed to logout');
            }
        } catch (error:any) {
            console.log(error)
            toast.error('Error logging out');
        }
    };

  return (
    <div className="flex flex-col w-full shadow-sm py-[20px] px-[20px]">
        <div className="flex flex-row items-center justify-between">
            <div className="cursor-pointer" onClick={() => router.push("/")}>
                <h1 className='text-[20px] font-[600]'>SafeKeep</h1>
            </div>
            <div className="flex flex-row items-center gap-[20px]">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="font-[600]">{user.firstName} {user.lastName}</h2>
                    <p>{user.email}</p>
                </div>
                <button onClick={() => handleLogout()}  className="px-[20px] py-[8px] rounded-[8px] bg-black text-white text-nowrap">Logout</button>
            </div>
        </div>
    </div>
  )
}

export default DashBoardHeader