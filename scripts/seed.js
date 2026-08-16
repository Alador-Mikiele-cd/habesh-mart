// scripts/seed.js
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import dbConnect from "../lib/dbConnect.js"
import Category from "../models/category.js"
import Product from "../models/product.js"

function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, "-")
}

async function makeGenderTree(genderName, shoeSubcats, clothingSubcats) {
    const gender = await Category.create({
        name: genderName,
        level: "gender",
        path: [genderName],
        slug: slugify(genderName),
    })

    const shoes = await Category.create({
        name: "Shoes",
        level: "type",
        parentId: gender._id,
        path: [...gender.path, "Shoes"],
        slug: `${gender.slug}-${slugify("Shoes")}`,
    })

    const clothing = await Category.create({
        name: "Clothing",
        level: "type",
        parentId: gender._id,
        path: [...gender.path, "Clothing"],
        slug: `${gender.slug}-${slugify("Clothing")}`,
    })

    const shoeCats = {}
    for (const name of shoeSubcats) {
        shoeCats[name] = await Category.create({
            name,
            level: "subcategory",
            parentId: shoes._id,
            path: [...shoes.path, name],
            slug: `${shoes.slug}-${slugify(name)}`,
        })
    }

    const clothingCats = {}
    for (const name of clothingSubcats) {
        clothingCats[name] = await Category.create({
            name,
            level: "subcategory",
            parentId: clothing._id,
            path: [...clothing.path, name],
            slug: `${clothing.slug}-${slugify(name)}`,
        })
    }

    return { gender, shoes, clothing, shoeCats, clothingCats }
}

async function seed() {
    await dbConnect()

    await Category.deleteMany({})
    await Product.deleteMany({})

    const men = await makeGenderTree("Men", ["Sneakers", "Formal"], ["Hoodies", "T-Shirts"])
    const women = await makeGenderTree("Women", ["Sneakers", "Heels"], ["Hoodies", "T-Shirts"])
    const kids = await makeGenderTree("Kids", ["Sneakers", "Sandals"], ["Hoodies", "T-Shirts"])

    // --- MEN (8 products) ---
    await Product.create([
        { name: "Classic White Sneakers", brand: "Nike", price: 2500, categoryId: men.shoeCats["Sneakers"]._id,
          variants: [{ size: "40", color: "white", stock: 10 }, { size: "41", color: "white", stock: 0 }, { size: "42", color: "black", stock: 5 }] },
        { name: "Air Runner Sneakers", brand: "Adidas", price: 2800, categoryId: men.shoeCats["Sneakers"]._id,
          variants: [{ size: "41", color: "gray", stock: 6 }, { size: "42", color: "gray", stock: 4 }] },
        { name: "Oxford Formal Shoes", brand: "Clarks", price: 3200, categoryId: men.shoeCats["Formal"]._id,
          variants: [{ size: "41", color: "brown", stock: 6 }, { size: "42", color: "black", stock: 3 }] },
        { name: "Leather Derby Shoes", brand: "Bata", price: 2900, categoryId: men.shoeCats["Formal"]._id,
          variants: [{ size: "40", color: "black", stock: 5 }] },
        { name: "Pullover Hoodie", brand: "Habesha Basics", price: 1400, categoryId: men.clothingCats["Hoodies"]._id,
          variants: [{ size: "M", color: "black", stock: 12 }, { size: "L", color: "gray", stock: 8 }] },
        { name: "Zip-Up Hoodie", brand: "Nike", price: 1800, categoryId: men.clothingCats["Hoodies"]._id,
          variants: [{ size: "L", color: "navy", stock: 7 } ] },
        { name: "Plain Crew T-Shirt", brand: "Habesha Basics", price: 600, categoryId: men.clothingCats["T-Shirts"]._id,
          variants: [{ size: "M", color: "white", stock: 20 }, { size: "L", color: "black", stock: 15 }] },
        { name: "Graphic Print T-Shirt", brand: "Puma", price: 850, categoryId: men.clothingCats["T-Shirts"]._id,
          variants: [{ size: "M", color: "red", stock: 9 }] },
    ])

    // --- WOMEN (8 products) ---
    await Product.create([
        { name: "Everyday Sneakers", brand: "Nike", price: 2600, categoryId: women.shoeCats["Sneakers"]._id,
          variants: [{ size: "37", color: "white", stock: 10 }, { size: "38", color: "pink", stock: 6 }] },
        { name: "Court Sneakers", brand: "Adidas", price: 2750, categoryId: women.shoeCats["Sneakers"]._id,
          variants: [{ size: "38", color: "white", stock: 5 }] },
        { name: "Classic Stiletto Heels", brand: "Aldo", price: 3400, categoryId: women.shoeCats["Heels"]._id,
          variants: [{ size: "37", color: "black", stock: 4 }, { size: "38", color: "red", stock: 0 }] },
        { name: "Block Heel Sandals", brand: "Bata", price: 2200, categoryId: women.shoeCats["Heels"]._id,
          variants: [{ size: "38", color: "beige", stock: 7 }] },
        { name: "Oversized Hoodie", brand: "H&M", price: 1500, categoryId: women.clothingCats["Hoodies"]._id,
          variants: [{ size: "S", color: "lilac", stock: 10 }, { size: "M", color: "gray", stock: 8 }] },
        { name: "Cropped Hoodie", brand: "Zara", price: 1650, categoryId: women.clothingCats["Hoodies"]._id,
          variants: [{ size: "S", color: "black", stock: 6 }] },
        { name: "Fitted Crew T-Shirt", brand: "H&M", price: 650, categoryId: women.clothingCats["T-Shirts"]._id,
          variants: [{ size: "S", color: "white", stock: 18 }, { size: "M", color: "pink", stock: 12 }] },
        { name: "Graphic Print T-Shirt", brand: "Puma", price: 800, categoryId: women.clothingCats["T-Shirts"]._id,
          variants: [{ size: "M", color: "yellow", stock: 5 }] },
    ])

    // --- KIDS (8 products) ---
    await Product.create([
        { name: "Light-Up Sneakers", brand: "Skechers", price: 1800, categoryId: kids.shoeCats["Sneakers"]._id,
          variants: [{ size: "28", color: "blue", stock: 8 }, { size: "30", color: "pink", stock: 6 }] },
        { name: "Velcro Strap Sneakers", brand: "Adidas", price: 1900, categoryId: kids.shoeCats["Sneakers"]._id,
          variants: [{ size: "29", color: "white", stock: 5 }] },
        { name: "Beach Sandals", brand: "Bata", price: 900, categoryId: kids.shoeCats["Sandals"]._id,
          variants: [{ size: "28", color: "orange", stock: 10 }, { size: "30", color: "blue", stock: 0 }] },
        { name: "Sport Sandals", brand: "Nike", price: 1100, categoryId: kids.shoeCats["Sandals"]._id,
          variants: [{ size: "29", color: "black", stock: 4 }] },
        { name: "Cartoon Print Hoodie", brand: "H&M Kids", price: 900, categoryId: kids.clothingCats["Hoodies"]._id,
          variants: [{ size: "6-7Y", color: "red", stock: 9 }, { size: "8-9Y", color: "blue", stock: 7 }] },
        { name: "Basic Hoodie", brand: "Habesha Basics", price: 800, categoryId: kids.clothingCats["Hoodies"]._id,
          variants: [{ size: "8-9Y", color: "gray", stock: 6 }] },
        { name: "Plain T-Shirt", brand: "Habesha Basics", price: 350, categoryId: kids.clothingCats["T-Shirts"]._id,
          variants: [{ size: "6-7Y", color: "white", stock: 15 }, { size: "8-9Y", color: "yellow", stock: 10 }] },
        { name: "Superhero Print T-Shirt", brand: "H&M Kids", price: 500, categoryId: kids.clothingCats["T-Shirts"]._id,
          variants: [{ size: "6-7Y", color: "blue", stock: 8 }] },
    ])

    console.log("Seed complete")
    process.exit(0)
}

seed().catch((err) => {
    console.error(err)
    process.exit(1)
})