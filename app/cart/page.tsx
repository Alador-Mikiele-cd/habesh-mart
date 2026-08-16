"use client"
import { useEffect, useState } from "react"

const CartPage = () => {
    const [err, setErr] = useState("")
    const [items, setItems] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch("/api/cart", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                const data = await res.json()

                if (!res.ok) {
                    setErr(data.message || "Something went wrong")
                    return
                }

                setItems(data.cart.items)
            } catch (err: any) {
                setErr(err.message)
            }
        }
        getData()
    }, [])

    if (err) return <p>{err}</p>
    if (items.length === 0) return <p>Your cart is empty</p>

    return (
        <ul>
            {items.map((item: any) => (
                <li key={item._id}>
                    {item.productId.name} — Size {item.size}, {item.color} — Qty: {item.quantity} — {item.productId.price} ETB
                </li>
            ))}
        </ul>
    )
}

export default CartPage