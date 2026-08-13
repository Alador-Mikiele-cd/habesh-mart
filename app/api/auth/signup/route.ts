import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextRequest , NextResponse} from "next/server";
import VerificationToken from "@/models/verificationToken"
import { Resend } from "resend";
import crypto from "crypto"
const resend = new Resend(process.env.RESEND_API_KEY)

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


    const token = crypto.randomBytes(32).toString("hex")    
    await VerificationToken.create({
        userId : user._id,
        token,
        expires:new Date(Date.now() +24 *60 * 60 * 1000)
    })

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

    await resend.emails.send({
            from: "onboarding@resend.dev", // Resend's sandbox sender, works before you verify a domain
            to: email,
            subject: "Verify your email — habesha-mart",
            html: `<p>Click the link below to verify your email:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p><p>This link expires in 24 hours.</p>`,
        })
    return NextResponse.json({id : user._id , name: user.name,email : user.email},{ status: 201 })
    }catch (err) {
  console.error(err);

  return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 }
  );
}
   
}

