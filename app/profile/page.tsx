import { auth } from "@/auth"
const profile = async () => {
    const session = await auth()
  return (
    <>
     {session?.user?.name}
     {session?.user?.email}
    </>
  )
}

export default profile