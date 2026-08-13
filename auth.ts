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
                            email:user.email,
                            role:user.role
                        }
                    },
                    
                })
            ],
            callbacks:{
                ...authConfig.callbacks,
                  async signIn({ user, account }) {
                    if (account?.provider === "google" || account?.provider === "facebook") {
                      await dbConnect();
                      const existingUser = await User.findOne({ email: user.email });
                      if (existingUser) {
                      
                        user.id = existingUser._id.toString();
                      }
                      
                    }
                    return true;
                  },
                      
                async jwt({token , user}) {
                    //@ts-ignore
                        if(user) token.role = user.role
                        return token
                },async session({session , token}) {
                     //@ts-ignore
                    if(session.user) session.user.role = token.role
                    return session
                }
            }
            
})