// app/components/SiteChrome.tsx
"use client"
import { usePathname } from "next/navigation"

const HIDDEN_ON = ["/login", "/signup"]

export default function SiteChrome({
    children,
    header,
    footer,
    banner,
}: {
    children: React.ReactNode
    header: React.ReactNode
    footer: React.ReactNode
    banner: React.ReactNode
}) {
    const pathname = usePathname()
    const hideChrome = HIDDEN_ON.includes(pathname)

    if (hideChrome) {
        return <>{children}</>
    }

    return (
        <>
            {banner}
            {header}
            {children}
            {footer}
        </>
    )
}