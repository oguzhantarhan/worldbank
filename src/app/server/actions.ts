'use server'

import { signOut } from "@/auth"
import { redirect } from "next/navigation"

export const  LogoutAction = async()=>{
 await signOut({redirect:false})
 redirect("/login")
}

