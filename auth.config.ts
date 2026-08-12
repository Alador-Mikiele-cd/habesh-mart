import { NextAuthConfig } from "next-auth";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

const authConfig = {
    providers:[
        Google,
        Facebook
    ],
    callbacks:{
        authorized({auth , request:{nextUrl}}) {
            const isLoggedIn = !!auth
            const isProtected = nextUrl.pathname.startsWith("/products")

            if(isProtected && !isLoggedIn){
                return false
            }

            return true
        },
    }
} satisfies NextAuthConfig

export default authConfig