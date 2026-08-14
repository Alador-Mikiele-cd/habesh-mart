import mongoose from "mongoose"
const { Schema, model, models } = mongoose
const variantSchema = new Schema({
    size: {type: String, required: true},
    color: {type: String, required: true},
    stock: {type: Number, required: true, default: 0}
})

const productSchema = new Schema({
    name: {type: String, required: true},
    brand: {type: String},
    price: {type: Number, required: true},
    categoryId: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    variants: {type: [variantSchema], default: []}
})

const Product = models.Product || model("Product", productSchema)
export default Product