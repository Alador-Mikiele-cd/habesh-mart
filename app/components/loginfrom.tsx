"use client"
import { login, logOut } from "../lib/auth"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"

const loginfrom = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const route = useRouter()
    const searchParams = useSearchParams()
async function handle() {
    const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
    })
    if (result?.error) {
        console.log("Invalid email or password");
        return;
    }

    const callbackUrlRaw = searchParams.get("callbackUrl") || "/products"
    const callbackUrl = callbackUrlRaw.startsWith("http")
        ? new URL(callbackUrlRaw).pathname
        : callbackUrlRaw

    window.location.href = callbackUrl
}

    return (
        <div className="mx-auto mt-16 w-full max-w-sm border border-gray-200 p-8">
            <h1 className="text-lg font-bold tracking-tight text-gray-900">Sign in</h1>

            <div className="mt-6 flex flex-col gap-2">
                <button
                    onClick={() => login("google")}
                    className="flex items-center justify-center gap-3 border border-gray-300 py-2 text-sm text-gray-700 transition hover:border-gray-900"
                >
                    <img src="google.png" alt="" className="h-4 w-4" /> Continue with Google
                </button>
                <button
                    onClick={() => login("facebook")}
                    className="flex items-center justify-center gap-3 border border-gray-300 py-2 text-sm text-gray-700 transition hover:border-gray-900"
                >
                    <img src="facebook.png" alt="" className="h-4 w-4" /> Continue with Facebook
                </button>
            </div>

            <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs uppercase tracking-wide text-gray-400">or</span>
                <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="flex flex-col gap-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-gray-300 px-1 py-2 text-sm outline-none transition focus:border-gray-900"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-b border-gray-300 px-1 py-2 text-sm outline-none transition focus:border-gray-900"
                />
            </div>

            <button
                onClick={handle}
                className="mt-6 w-full border border-gray-900 py-2 text-xs font-medium tracking-wide transition hover:bg-gray-900 hover:text-white"
            >
                SIGN IN
            </button>

            <Link href="/signup" className="mt-4 block text-center text-xs text-gray-500 underline hover:text-gray-900">
                I don't have an account
            </Link>

            <button onClick={() => logOut()} className="mt-6 block w-full text-center text-xs text-gray-400 underline">
                logout
            </button>
        </div>
    )
}

export default loginfrom