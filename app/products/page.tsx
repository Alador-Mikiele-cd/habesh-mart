import dbConnect from "@/lib/dbConnect"
import Product from "@/models/product"
import Category from "@/models/category"  // registers the Category schema with mongoose
import Link from "next/link"

export default async function ProductsPage() {
    await dbConnect()
    const products = await Product.find().populate("categoryId").lean()

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Products</h1>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product: any) => (
                    <Link key={product._id.toString()} href={`/products/${product._id}`} className="group">
                        <div className="aspect-square w-full overflow-hidden bg-gray-100">
                            {/* placeholder until product images are added to the schema */}
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                No image
                            </div>
                        </div>

                        <div className="mt-3">
                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                {product.categoryId?.name}
                            </p>
                            <p className="mt-1 text-sm font-medium text-gray-900 transition group-hover:opacity-60">
                                {product.name}
                            </p>
                            <p className="mt-1 text-sm text-gray-600">{product.price} ETB</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}