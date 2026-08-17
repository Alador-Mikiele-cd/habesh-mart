import { NextAuthConfig } from "next-auth";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

const authConfig = {
    pages: {
        signIn: "/login"
    },
    providers: [
        Google,
        Facebook
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth
            const isProtected = nextUrl.pathname.startsWith("/cart")
            const isAdminProtected = nextUrl.pathname.startsWith("/admin")

            if (isProtected && !isLoggedIn) {
                return false
            }
            if (isAdminProtected && (!isLoggedIn || auth?.user?.role !== "admin")) {
                return false
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                //@ts-ignore
                token.role = user.role
                //@ts-ignore
                token.emailVerified = user.emailVerified
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                //@ts-ignore
                session.user.id = token.id
                //@ts-ignore
                session.user.role = token.role
                //@ts-ignore
                session.user.emailVerified = token.emailVerified
            }
            return session
        },
    }
} satisfies NextAuthConfig

export default authConfig