import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from '@/lib/dbConnect'
import User from "@/models/user"
import bcrypt from "bcryptjs"
import authConfig from "./auth.config";
export const {auth , handlers ,signIn , signOut} = NextAuth({
            ...authConfig,
            providers :[
                ...authConfig.providers,
                CredentialsProvider({
                    name: "Credentials",
                    credentials:{
                        email: { label: "Email", type: "email" },
                        password: { label: "Password", type: "password" }
                        
                    },
                    async authorize(credentials){
                        if(!credentials?.email || !credentials?.password){
                            return null
                        }
                        await dbConnect()

                        const user = await User.findOne({
                            email:credentials.email
                        })
                        if (!user) {
                            return null;
                        }

                        const passwordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (!passwordCorrect) {
                            return null;
                        }
                        return{
                            id : user._id.toString(),
                            name:user.name,
                            email:user.email
                        }
                    }
                })
            ],
            
})