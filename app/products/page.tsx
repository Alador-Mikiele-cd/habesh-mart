"use client"
import { logOut } from "../lib/auth"
const products = () => {
    
  return (
    <div>
        <h1>product</h1>
        <button onClick={() => logOut()}>logout</button>
    </div>
  )
}

export default products