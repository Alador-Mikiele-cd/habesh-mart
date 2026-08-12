"use client"
import { login, logOut } from "../lib/auth"
const loginfrom = () => {
  return (
    <>
        
            <button onClick={() => login("google")}>signIn with Google</button>
            <button onClick={() => login("facebook")}>signIn with Facebook</button>
            <button onClick={() => logOut()}> Logout </button>

       
    </>
  )
}

export default loginfrom