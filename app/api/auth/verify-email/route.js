import { error } from "node:console";
import dbConnect from "../../../../lib/dbConnect"
import { NextRequest , NextResponse} from "next/server";
import VerificationToken from "../../../../models/verificationToken"
import User from  "../../../../models/user"
export const GET = async (req:NextRequest)=>{
    await dbConnect()

    const token = req.nextUrl.searchParams.get("token")
    if(!token){
        return NextResponse.json({error : "token not found" }, {status:404})
    }

    const tokenexiset = await  VerificationToken.findOne({token})
    if(!tokenexiset){
        return NextResponse.json({error : "token not found" }, {status:404})
    }

    if (tokenexiset.expires < new Date()) {
        return NextResponse.json({error: "token expired"}, {status: 410})
    }
    const user = await User.findById(tokenexiset.userId)
    if(!user){
        return NextResponse.json({error : "user not found" }, {status:404})
    }
    user.emailVerified = new Date()
    await user.save()


    await VerificationToken.findByIdAndDelete(tokenexiset._id)
    return NextResponse.redirect(new URL("/login?verified=true", req.url))
}