"use client"
import { useState } from "react"
import { login} from "../lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
const signupfrom = () => {
    const[email , setEmail] = useState("")
    const[password , setPassword] = useState("")
    const route = useRouter()
    async function handle(params:any) {
        const res = await fetch("/api/auth/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password})
        })
        const data = await res.json()
        console.log(data)
        
        if(!res.ok){
            console.log(data.error)
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
                        <button onClick={handle} className=" bg-white rounded-[3px] w-20 m-auto mt-[20px]">signUp</button>
                        <Link href="/login" className="text-blue-800 text-[13px] text-center"> I have an account</Link>
            
                   </div>

       
    </>
  )
}

export default signupfrom