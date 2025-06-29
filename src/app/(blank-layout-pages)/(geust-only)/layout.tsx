import GuestOnlyRoute from "@/hocs/GuestOnlyRoute"
import { ChildrenType } from "@/types/types"



type Props = ChildrenType 

const Layout = ({ children }: Props) => {

  return (
    <GuestOnlyRoute  >
     {children}
    </GuestOnlyRoute>
  )
}

export default Layout
