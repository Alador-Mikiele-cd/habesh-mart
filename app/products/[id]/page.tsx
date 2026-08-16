import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/components/AddToCartButton"
export default async function ProductDetailPage({params}:{ params: Promise<{id:string}>} ) {
    await dbConnect()
    const{id} = await params
    const product = await Product.findById(id).populate("categoryId").lean()

    if (!product) {
        notFound()
    }
    return(
        <>
            <div>
            <h1>{product.name}</h1>
            <p>Brand: {product.brand}</p>
            <p>Price: {product.price} ETB</p>
            <p>Category: {product.categoryId?.name}</p>

            <h2>Available options</h2>
            <ul>
                {product.variants.map((variant:any, i:any) => (
                    <li key={i}>
                        Size {variant.size}, {variant.color} — {variant.stock > 0 ? `${variant.stock} in stock` : "Out of stock"}
                    </li>
                ))}
            </ul>
        </div>
        <AddToCartButton productId={product._id.toString()} variants={product.variants} />
        </>
    )

}