// Next Imports
import { auth } from '@/auth'
import { ChildrenType } from '@/types/types'
import { redirect } from 'next/navigation'





const AdminOnlyRoute = async ({ children }: ChildrenType ) => {
  const session = await auth()

  if (session?.user.userType!="Admin") {
    redirect("/")
  }

  return <>{children}</>
}

export default AdminOnlyRoute
