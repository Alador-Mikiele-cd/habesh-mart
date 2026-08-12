"use server"
import { signIn , signOut} from "@/auth";

export const login = async (provider:any)=>{
    await signIn(provider , {redirectTo :"/products"})
}
export const logOut = async ()=>{
    await signOut({redirectTo :"/"})
}