
import AdminOnlyRoute from "@/hocs/AdminOnlyRoute"
import { ChildrenType } from "@/types/types"



type Props = ChildrenType 

const Layout = ({ children }: Props) => {

  return (
    <AdminOnlyRoute >
     {children}
    </AdminOnlyRoute>
  )
}

export default Layout
