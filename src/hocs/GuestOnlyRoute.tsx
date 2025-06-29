// Next Imports
import { auth } from '@/auth'
import { ChildrenType } from '@/types/types'
import { redirect } from 'next/navigation'





const GuestOnlyRoute = async ({ children }: ChildrenType ) => {
  const session = await auth()

  if (session) {
    redirect("/")
  }

  return <>{children}</>
}

export default GuestOnlyRoute
