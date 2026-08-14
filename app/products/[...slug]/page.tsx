
import dbConnect from "@/lib/dbConnect"
import Product from "@/models/product"
import Category from "@/models/category"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function FilteredProductsPage({params}: {params: Promise<{ slug: string[] }>}) {
    await dbConnect()

    const { slug } = await params
    const fullSlug = slug.join("-")

    const category = await Category.findOne({ slug: fullSlug })

    if (!category) {
        notFound()
    }

    const products = await Product.find({ categoryId: category._id }).populate("categoryId")

    return (
        <div>
            <h1>{category.name}</h1>
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