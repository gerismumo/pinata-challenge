import connectDB from "@/lib/dbconnect";
import { User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const users = await User.find();
       

        const Files: any[] = []; 

        users.forEach((user: any) => {
            const firstName = user.firstName;
            const lastName = user.lastName;
            const email = user.email;
            const country = user.country;

    
            const publicFiles = user.file.filter((f: any) => f.category === "private");

            publicFiles.forEach((file: any) => {
                const updatedFile = {
                    url: file.url,
                    category: file.category,
                    title: file.title,
                    description: file.description,
                    firstName,
                    lastName,
                    email,
                    country
                };

                return Files.push(updatedFile);

            });

            return Files;
        });

        return NextResponse.json({ success: true, data: Files });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: "Internal Server Error" });
    }
}
