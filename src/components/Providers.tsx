

// Util Imports

import { NextAuthProvider } from "@/providers/nextAuthProvider"
import { ChildrenType } from "@/types/types"
import AppReactToastify from "./AppReactToastify"
import ReduxProvider from "@/redux-store/ReduxProvider"



type Props = ChildrenType 

const Providers = (props: Props) => {
  // Props
  const { children } = props


  return (
    <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>

            {/* <ReduxProvider></ReduxProvider> */}
            {children}
            <AppReactToastify  hideProgressBar />   
    </NextAuthProvider>
  )
}

export default Providers
