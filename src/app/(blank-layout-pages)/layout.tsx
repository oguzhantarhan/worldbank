import Providers from "@/components/Providers"
import { ChildrenType } from "@/types/types"



type Props = ChildrenType 

const Layout = ({ children }: Props) => {

  return (
    <Providers >
     {children}
    </Providers>
  )
}

export default Layout
