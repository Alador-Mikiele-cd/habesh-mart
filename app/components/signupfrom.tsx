"use client"
import { useState } from "react"
import { login} from "../lib/auth"
import { useRouter } from "next/navigation"
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
        
            <button onClick={() => login("google")}>signIn with Google</button>
            <button onClick={() => login("facebook")}>signIn with Facebook</button>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handle}>signUp</button>

       
    </>
  )
}

export default signupfrom