"use server"

import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"





const Logout = async() => {
    const session=await auth()
 if (!!session) {
    await signOut({redirect:true,redirectTo:"/login"})
 }
   else
    redirect("/")
  return null
}

export default Logout 