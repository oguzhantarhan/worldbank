
import { auth } from "@/auth"
import ResponsiveAppBar from "@/components/app-bar/appbar"
import Providers from "@/components/Providers"
import AuthGuard from "@/hocs/AuthGuard"
import { ChildrenType } from "@/types/types"



type Props = ChildrenType 

const Layout =async ({ children }: Props) => {
const session=await auth()
  return (
    <Providers >
        <AuthGuard >
          <ResponsiveAppBar userType={session?.user.userType??""}/>
          {children}
         
          </AuthGuard>
    </Providers>
  )
}

export default Layout
