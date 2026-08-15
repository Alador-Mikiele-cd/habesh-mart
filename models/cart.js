import mongoose from "mongoose"
const { Schema, model, models } = mongoose

const cartItemSchema = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: "Product", required: true},
    size: {type: String, required: true},
    color: {type: String},
    quantity: {type: Number, required: true, default: 1},
})

const cartSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    items: {type: [cartItemSchema], default: []},
})

const Cart = models.Cart || model("Cart", cartSchema)
export default Cart