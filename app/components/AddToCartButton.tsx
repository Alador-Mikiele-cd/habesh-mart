"use client"
import { useState } from "react"

export default function AddToCartButton({ productId, variants }) {
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [message, setMessage] = useState("")

    const sizes = [...new Set(variants.map((v) => v.size))]
    const colors = [...new Set(variants.map((v) => v.color))]

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
                <p>Size:</p>
                {sizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{ fontWeight: selectedSize === size ? "bold" : "normal" }}
                    >
                        {size}
                    </button>
                ))}
            </div>

            <div>
                <p>Color:</p>
                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{ fontWeight: selectedColor === color ? "bold" : "normal" }}
                    >
                        {color}
                    </button>
                ))}
            </div>

            <button onClick={handleAddToCart}>Add to cart</button>

            {message && <p>{message}</p>}
        </div>
    )
}