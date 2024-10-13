import connectDB from "@/lib/dbconnect";
import { User } from "@/lib/models";
import { pinata } from "@/utils/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{

        await connectDB();
        const cookie = req.cookies.get('user'); 
        if (!cookie) {
            return NextResponse.json({ success: false, message: 'User not authenticated' });
        }

        const {id} = JSON.parse(cookie.value); 
        const formData = await req.formData();

        const file:any = formData.get('file');
        const description = formData.get('description');
        const heading = formData.get('heading');
        const category = formData.get('category');

        if (typeof file !== 'object') {
            return NextResponse.json({ success: false, message: 'No file provided' });
        }
        
        const uploadData = await pinata.upload.file(file as File)
        
        const url = await pinata.gateways.createSignedURL({
            cid: uploadData.cid,
            expires: 3600,
        });

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' });
        }

        
        const newFile = {
            url: url,  
            category: category,  
            title: heading,
            description: description
        };

        user.file.push(newFile);
        await user.save();

        return NextResponse.json({ success: true, message: 'File uploaded successfully'});

    }catch(error: any) {
        return NextResponse.json({ success: false, message: 'An error occurred while processing your request' });
    }
}