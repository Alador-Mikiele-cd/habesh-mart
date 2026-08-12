import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextRequest , NextResponse} from "next/server";

export const POST = async (req:NextRequest)=>{
    try{
         await dbConnect()
    const {email , password} = await req.json()
    if(!email || !password){
        return NextResponse.json({message : "enter email and password"},{ status: 409 })
    }
    const existes = await User.findOne({email})

    if(existes){
        return NextResponse.json({message : "email already existes"},{ status: 400 })
    }
   
    const user = await User.create({email , password})

    return NextResponse.json({id : user._id , name: user.name,email : user.email},{ status: 201 })
    }catch (err) {
  console.error(err);

  return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 }
  );
}
   
}

