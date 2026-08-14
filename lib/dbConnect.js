import mongoose from "mongoose";
import "./models.js"
const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI){
    throw new Error("have trouble connecting")
}

let cach = global.mongoose

if(!cach){
    cach = global.mongoose = {conn : null ,promise : null}
}

export default async function dbConnect() {
    if(cach.conn) return cach.conn

    if(!cach.promise){
        cach.promise = mongoose.connect(MONGODB_URI)
    }
    cach.conn = await cach.promise
    return cach.conn
}