"use client"
import { useState } from "react"

export default function AddToCartButton({ productId, variants }) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const [message, setMessage] = useState("")

    const sizes = [...new Set(variants.map((v: any) => v.size))] as string[]
    const colors = [...new Set(variants.map((v: any) => v.color))] as string[]

    async function handleAddToCart() {
        if (!selectedSize || !selectedColor) {
            setMessage("Please select a size and color")
            return
        }

        const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId,
                size: selectedSize,
                color: selectedColor,
                quantity: 1,
            }),
        })

        const data = await res.json()

        if (!res.ok) {
            setMessage(data.message || "Something went wrong")
            return
        }

        setMessage("Added to cart!")
    }

    return (
        <div>
            <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">Size</p>
                <div className="mt-2 flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`border px-4 py-2 text-sm transition ${
                                selectedSize === size
                                    ? "border-gray-900 bg-gray-900 text-white"
                                    : "border-gray-300 text-gray-700 hover:border-gray-900"
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <p className="text-xs uppercase tracking-wide text-gray-400">Color</p>
                <div className="mt-2 flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`border px-4 py-2 text-sm capitalize transition ${
                                selectedColor === color
                                    ? "border-gray-900 bg-gray-900 text-white"
                                    : "border-gray-300 text-gray-700 hover:border-gray-900"
                            }`}
                        >
                            {color}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleAddToCart}
                className="mt-6 w-full border border-gray-900 py-3 text-xs font-medium tracking-wide transition hover:bg-gray-900 hover:text-white"
            >
                ADD TO CART
            </button>

            {message && (
                <p className={`mt-3 text-sm ${message === "Added to cart!" ? "text-green-600" : "text-red-600"}`}>
                    {message}
                </p>
            )}
        </div>
    )
}