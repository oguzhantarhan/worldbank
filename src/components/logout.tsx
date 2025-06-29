"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    fetch("/api/auth/logout").catch(() => {
      router.push("/")
    })
  }, [])

  return null
}

export default Logout
