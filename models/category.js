import mongoose from "mongoose"
const { Schema, model, models } = mongoose
const categorySchema = new Schema({
    name: {type: String, required: true},
    parentId: {type: Schema.Types.ObjectId, ref: "Category"},
    level: {type: String, required: true, enum: ["gender", "type", "subcategory"]},
    path: {type: [String], default: []},
    slug: { type: String, required: true, unique: true }
})

const Category = models.Category || model("Category", categorySchema)
export default Category