import connectDB from "@/lib/dbconnect";
import { User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export async function DELETE(req:NextRequest, {params}: {params: {id: string}} ) {
    try {
        await connectDB();
  
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

         const fileIndex = user.file.findIndex((f: any) => f._id.toString() === params.id);
         if (fileIndex === -1) {
             return NextResponse.json({ success: false, message: 'File not found' });
         }
 
         user.file.splice(fileIndex, 1);

         console.log("user.file",user.file)
         await user.save();
 
         return NextResponse.json({ success: true, message: 'File deleted successfully' });

    }catch(error) {
        return NextResponse.json({success:false, message: "internal server error"})
    }
}