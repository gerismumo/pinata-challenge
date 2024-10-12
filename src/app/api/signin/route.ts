import { User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const { email, password } = await req.json();


        if (!email || !password) {
          return NextResponse.json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
          return NextResponse.json({ success: false, message: 'Invalid email or password' });
        }
  
        const isMatch = (password === user.password);
  
        if (!isMatch) {
          return NextResponse.json({ success: false, message: 'Invalid email or password' });
        }


        const expires = new Date();
        expires.setDate(expires.getDate() + 30);

        const userData = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
        };
  
        const response = NextResponse.json({
            success: true,
            message: 'Login successful',
            user: userData,
          });
      
          
        response.cookies.set('user', JSON.stringify(userData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires,
        });
      
          return response;
    }catch(error: any) {
        NextResponse.json({success: false, message:'Internal Server Error'})
    }
}