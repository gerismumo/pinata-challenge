import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const formData = await req.formData();

        const file = formData.get('file');
        const description = formData.get('description');
        const heading = formData.get('heading');

        console.log(file);

        console.log("formData",formData);

    }catch(error: any) {
        return NextResponse.json({ success: false, message: 'An error occurred while processing your request' });
    }
}