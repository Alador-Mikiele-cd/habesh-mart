// app/products/[...slug]/page.tsx
import dbConnect from "@/lib/dbConnect"
import Product from "@/models/product"
import Category from "@/models/category"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function FilteredProductsPage({
    params,
}: {
    params: Promise<{ slug: string[] }>
}) {
    await dbConnect()

    const { slug } = await params
    const fullSlug = slug.join("-")

   
    const matchingCategories = await Category.find({
        slug: { $regex: `^${fullSlug}(-|$)` }
    })

    if (matchingCategories.length === 0) {
        notFound()
    }

    const categoryIds = matchingCategories.map((c) => c._id)
    const products = await Product.find({ categoryId: { $in: categoryIds } }).populate("categoryId")

    const currentCategory = matchingCategories.find((c) => c.slug === fullSlug) ?? matchingCategories[0]

    return (
        <div>
            <h1>{currentCategory.name}</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id.toString()}>
                        <Link href={`/products/${product._id}`}>
                            {product.name} — {product.price} ETB
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}