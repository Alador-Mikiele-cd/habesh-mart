"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"

export default function VerifyBanner() {
    const { data: session } = useSession()
    const [dismissed, setDismissed] = useState(false)

    if (!session?.user || session.user.emailVerified || dismissed) {
        return null
    }

    return (
        <div style={{ background: "#fff3cd", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Please verify your email — check your inbox for a link.</span>
            <button onClick={() => setDismissed(true)}>Dismiss</button>
        </div>
    )
}