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
  
        return NextResponse.json({
          success: true,
          message: 'Login successful',
          user: { id: user._id, email: user.email, name: user.name },
        });

    }catch(error: any) {
        NextResponse.json({success: false, message:'Internal Server Error'})
    }
}