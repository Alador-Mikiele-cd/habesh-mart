
// scripts/seed.js
import dbConnect from "../lib/dbConnect.js"
import Category from "../models/category.js"
import Product from "../models/product.js"

async function seed() {
    await dbConnect()

    // wipe existing data so this script is safe to re-run
    await Category.deleteMany({})
    await Product.deleteMany({})

    // level 1: gender
    const men = await Category.create({ name: "Men", level: "gender", path: ["Men"] })
    const women = await Category.create({ name: "Women", level: "gender", path: ["Women"] })

    // level 2: type (under Men)
    const menShoes = await Category.create({ name: "Shoes", level: "type", parentId: men._id, path: [...men.path, "Shoes"] })
    const menClothing = await Category.create({ name: "Clothing", level: "type", parentId: men._id, path: [...men.path, "Clothing"] })

    // level 3: subcategory (under Men > Shoes)
    const menSneakers = await Category.create({ name: "Sneakers", level: "subcategory", parentId: menShoes._id, path: [...menShoes.path, "Sneakers"] })
    const menFormal = await Category.create({ name: "Formal", level: "subcategory", parentId: menShoes._id, path: [...menShoes.path, "Formal"] })

    // a couple of test products, pointing at real leaf categories
    await Product.create({
        name: "Classic White Sneakers",
        brand: "Nike",
        price: 2500,
        categoryId: menSneakers._id,
        variants: [
            { size: "40", color: "white", stock: 10 },
            { size: "41", color: "white", stock: 0 },
            { size: "42", color: "black", stock: 5 },
        ]
    })

    await Product.create({
        name: "Oxford Formal Shoes",
        brand: "Clarks",
        price: 3200,
        categoryId: menFormal._id,
        variants: [
            { size: "42", color: "brown", stock: 4 },
        ]
    })

    console.log("Seed complete")
    process.exit(0)
}

seed().catch((err) => {
    console.error(err)
    process.exit(1)
})