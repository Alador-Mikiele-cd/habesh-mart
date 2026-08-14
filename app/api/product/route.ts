import dbConnect from "@/lib/dbConnect"
import Product from "@/models/product"
import { NextResponse , NextRequest } from "next/server"
export const GET = async ()=>{
    try{
        await dbConnect()

        const product = await Product.find().populate("categoryId")
       
        return NextResponse.json({product},{status : 201})

    }catch(err){
        return NextResponse.json({err},{status : 500})
    }
}