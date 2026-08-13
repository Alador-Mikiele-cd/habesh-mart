"use client"
import { login, logOut } from "../lib/auth"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
const loginfrom = () => {
    const[email , setEmail] = useState("")
        const[password , setPassword] = useState("")
        const route = useRouter()
    async function handle() {
        const result = await signIn("credentials",{
            email,
            password,
            redirect: false,
        })
        if (result?.error) {
      console.log("Invalid email or password");
      return;
    }
    route.push("/products")
    }
  return (
    <>
        <div className="flex flex-col w-full max-w-[250px] bg-emerald-300 m-auto rounded-2xl">
            <button onClick={() => login("google")} className="flex m-auto  px-4 gap-4 bg-white rounded-[3px] mt-[10px]" > <img src="google.png" alt="" className="w-5 h-5"/> Google </button>
            <button onClick={() => login("facebook")}  className="flex m-auto px-4 gap-2 bg-white rounded-[3px] mt-[10px]" > <img src="facebook.png" alt="" className="w-6 h-6"/> Facebook</button>
            
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className=" w-[90%] m-auto my-[10px]"/>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className=" w-[90%] m-auto"/>
            <button onClick={handle} className=" bg-white rounded-[3px] w-20 m-auto mt-[20px]">signIn</button>
            <Link href="/signup" className="text-blue-800 text-[13px] text-center"> I do not have an account</Link>
            <button onClick={()=> logOut()}>logout</button>

       </div>
    </>
  )
}

export default loginfrom