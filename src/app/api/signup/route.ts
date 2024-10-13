import connectDB from "@/lib/dbconnect";
import { User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();

        const {firstName, lastName, country, dateOfBirth, email, password, additinalInfo} = body;

    
        if (!firstName || !lastName || !country || !dateOfBirth || !email || !password) {
            return NextResponse.json({ success: false, message: 'Missing required fields' });
        }
    
        await connectDB();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, message: 'User with this email already exists' });
        }
    
        const newUser = await User.create({
            firstName,
            lastName,
            country,
            dateOfBirth,
            email,
            password,
            additinalInfo,
        });
  
        if(newUser) {
            return NextResponse.json({
                success: true,
                message: 'User created successfully',
              });
        }
      
    }catch(error:any) {
        NextResponse.json({success: false, message:'Internal Server Error'})
    }
}