"use server"
import { auth } from '@/auth'
import AuthRedirect from '@/components/AuthRedirect'
import { ChildrenType } from '@/types/types'

export default async function AuthGuard({ children }: ChildrenType ) {
  const session = await auth()

  return <>{session ? children : <AuthRedirect  />}</>
}
