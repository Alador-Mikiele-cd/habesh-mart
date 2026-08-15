// scripts/seed.js
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import dbConnect from "../lib/dbConnect.js"
import Category from "../models/category.js"
import Product from "../models/product.js"

function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, "-")
}

async function seed() {
    await dbConnect()

    await Category.deleteMany({})
    await Product.deleteMany({})

    // level 1: gender
    const men = await Category.create({
        name: "Men",
        level: "gender",
        path: ["Men"],
        slug: slugify("Men"),
    })
     const kids = await Category.create({
        name: "Kids",
        level: "gender",
        path: ["Kids"],
        slug: slugify("Kids"),
    })

     const women = await Category.create({
        name: "Women ",
        level: "gender",
        path: ["Women"],
        slug: slugify("Women "),
    })


    // level 2: type (under Men)
    const menShoes = await Category.create({
         name: "Shoes",
        level: "type",
        parentId: men._id,
        path: [...men.path, "Shoes"],
        slug: `${men.slug}-${slugify("Shoes")}`,
    })

    // level 3: subcategory (under Men > Shoes)
    const menSneakers = await Category.create({
        name: "Sneakers",
        level: "subcategory",
        parentId: menShoes._id,
        path: [...menShoes.path, "Sneakers"],
        slug: `${menShoes.slug}-${slugify("Sneakers")}`,
    })
    const menFormal = await Category.create({
        name: "Formal",
        level: "subcategory",
        parentId: menShoes._id,
        path: [...menShoes.path, "Formal"],
        slug: `${menShoes.slug}-${slugify("Formal")}`,
    })

    // ...same pattern for menFormal, women, kids, etc.

    await Product.create({
        name: "Classic White Sneakers",
        brand: "Nike",
        price: 2500,
        categoryId: menSneakers._id,
        variants: [
            { size: "40", color: "white", stock: 10 },
            { size: "41", color: "white", stock: 0 },
        ],
    })
    await Product.create({
    name: "Oxford Formal Shoes",
    brand: "Clarks",
    price: 3200,
    categoryId: menFormal._id,
    variants: [
        { size: "41", color: "brown", stock: 6 },
        { size: "42", color: "black", stock: 3 },
    ],
})

    console.log("Seed complete")
    process.exit(0)
}

seed().catch((err) => {
    console.error(err)
    process.exit(1)
})