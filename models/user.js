import {Schema , model , models} from "mongoose"
import bcrypt from "bcryptjs"
const UserSchema = new Schema({
    name:{type : String },
    email:{type:String , required:true},
    password:{type : String },
})

UserSchema.pre("save",async function () {
    if(!this.isModified("password")) return

    this.password = await bcrypt.hash(this.password,10) 

})

const User = models.User || model("User",UserSchema)

export default User
