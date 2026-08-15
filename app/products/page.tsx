import dbConnect from "@/lib/dbConnect"
import Product from "@/models/product"
import Category from "@/models/category"  // registers the Category schema with mongoose
import Link from "next/link"
export default async function ProductsPage() {
    await dbConnect()
    const products = await Product.find().populate("categoryId")

    return (
        <div>
            <h1>Products</h1>
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