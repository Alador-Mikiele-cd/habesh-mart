"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

const CartPage = () => {
    const [err, setErr] = useState("")
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    async function loadCart() {
        try {
            const res = await fetch("/api/cart")
            const data = await res.json()

            if (!res.ok) {
                setErr(data.message || "Something went wrong")
                setLoading(false)
                return
            }

            setItems(data.cart.items)
            setLoading(false)
        } catch (err: any) {
            setErr(err.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCart()
    }, [])

    async function updateQuantity(itemId: string, newQuantity: number) {
        if (newQuantity < 1) return

        const res = await fetch("/api/cart", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ itemId, quantity: newQuantity }),
        })
        const data = await res.json()

        if (!res.ok) {
            setErr(data.message)
            return
        }

        setErr("")
        setItems(data.cart.items)
    }

    async function removeItem(itemId: string) {
        const res = await fetch("/api/cart", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ itemId }),
        })
        const data = await res.json()

        if (!res.ok) {
            setErr(data.message)
            return
        }

        setItems(data.cart.items)
    }

    const subtotal = items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    )

    if (loading) {
        return <div className="mx-auto max-w-7xl px-4 py-16 text-sm text-gray-500">Loading your cart…</div>
    }

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-24 text-center">
                <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                <p className="mt-2 text-sm text-gray-500">Nothing here yet — go find something you like.</p>
                <Link
                    href="/products"
                    className="mt-6 inline-block border border-gray-900 px-6 py-2 text-xs font-medium tracking-wide transition hover:bg-gray-900 hover:text-white"
                >
                    BROWSE PRODUCTS
                </Link>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Your Cart</h1>

            {err && <p className="mt-3 text-sm text-red-600">{err}</p>}

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
                {/* items */}
                <div className="lg:col-span-2">
                    <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
                        {items.map((item) => (
                            <li key={item._id} className="flex items-center justify-between gap-4 py-5">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{item.productId.name}</p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Size {item.size} · {item.color}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-900">{item.productId.price} ETB</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-300">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="px-3 py-1 text-sm text-gray-600 transition hover:bg-gray-100"
                                        >
                                            −
                                        </button>
                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="px-3 py-1 text-sm text-gray-600 transition hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item._id)}
                                        className="text-xs text-gray-400 underline transition hover:text-gray-900"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* summary */}
                <div className="border border-gray-200 p-6 h-fit">
                    <p className="text-sm font-medium text-gray-900">Order summary</p>
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>{subtotal} ETB</span>
                    </div>
                    <button className="mt-6 w-full border border-gray-900 py-2 text-xs font-medium tracking-wide transition hover:bg-gray-900 hover:text-white">
                        CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartPage