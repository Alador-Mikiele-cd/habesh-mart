// app/components/CategoryNav.tsx
import dbConnect from "@/lib/dbConnect"
import Category from "@/models/category"
import Link from "next/link"

export default async function CategoryNav() {
    await dbConnect()

    const topLevel = await Category.find({ parentId: null })

    return (
        <nav>
            <ul className="flex gap-4">
                {topLevel.map((cat) => (
                    <li key={cat._id.toString()}>
                        <Link href={`/category/${cat.slug}`}>
                            {cat.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}