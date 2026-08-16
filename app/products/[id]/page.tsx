import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/components/AddToCartButton"

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    await dbConnect()
    const { id } = await params
    const product = await Product.findById(id).populate("categoryId").lean()

    if (!product) {
        notFound()
    }

    const plainProduct = JSON.parse(JSON.stringify(product))

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                {/* image placeholder */}
                <div className="aspect-square w-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
                    No image
                </div>

                {/* details */}
                <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                        {plainProduct.categoryId?.name}
                    </p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                        {plainProduct.name}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">{plainProduct.brand}</p>
                    <p className="mt-4 text-lg text-gray-900">{plainProduct.price} ETB</p>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <AddToCartButton productId={plainProduct._id} variants={plainProduct.variants} />
                    </div>
                </div>
            </div>
        </div>
    )
}