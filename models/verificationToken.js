import mongoose, {Schema , model , models} from "mongoose"

const VerificationTokenSchema = new Schema({
    userId:{type : Schema.Types.ObjectId , ref : "User", required : true},
    token: { type: String, required: true, unique: true },
    expires: { type: Date, required: true },
})


const VerificationToken = models.VerificationToken || model("VerificationToken", VerificationTokenSchema)
export default VerificationToken