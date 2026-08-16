import { NextResponse, NextRequest } from "next/server"
import dbConnect from "@/lib/dbConnect"
import { auth } from "@/auth"
import Cart from "@/models/cart"
import Product from "@/models/product"

export const POST = async (req: NextRequest) => {
    try {
        await dbConnect()
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "not logged in" }, { status: 401 })
        }

        const { productId, size, color, quantity } = await req.json()

        const product = await Product.findById(productId)
        if (!product) {
            return NextResponse.json({ message: "product not found" }, { status: 404 })
        }

        const matchedVariant = product.variants.find(
            (v) => v.size === size && v.color === color
        )

        if (!matchedVariant) {
            return NextResponse.json({ message: "that size/color isn't available" }, { status: 400 })
        }

        if (matchedVariant.stock < quantity) {
            return NextResponse.json({ message: "not enough stock" }, { status: 400 })
        }


        let cart = await Cart.findOne({ userId: session.user.id })

        if (!cart) {
            cart = await Cart.create({
                userId: session.user.id,
                items: [{ productId, size, color, quantity }],
            })
        } else {
            const existingItem = cart.items.find(
                (item) =>
                    item.productId.toString() === productId &&
                    item.size === size &&
                    item.color === color
            )

            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                cart.items.push({ productId, size, color, quantity })
            }

            await cart.save()
        }

        return NextResponse.json({ cart }, { status: 200 })

    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}
export const GET = async () => {
    try {
        await dbConnect()
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "not logged in" }, { status: 401 })
        }

        const cart = await Cart.findOne({ userId: session.user.id }).populate("items.productId")

        if (!cart) {
            return NextResponse.json({ cart: { items: [] } }, { status: 200 })
        }

        return NextResponse.json({ cart }, { status: 200 })

    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}