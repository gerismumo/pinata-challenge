import connectDB from "@/lib/dbconnect";
import { User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await connectDB()

        const cookie = req.cookies.get('user'); 
        if (!cookie) {
            return NextResponse.json({ success: false, message: 'User not authenticated' });
        }

        const { id } = JSON.parse(cookie.value);  
        
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' });
        }


        if (!user.file || user.file.length === 0) {
            return NextResponse.json({ success: false, message: 'No files found for this user' });
        }


        return NextResponse.json({ success: true, data: user.file });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: 'An error occurred while fetching files' });
    }
}
