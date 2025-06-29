import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'





declare module 'next-auth' {
 
  interface User {
    id: string
    firstName?: string | null
    email?: string | null
    lastName?: string | null
    userType: string | null
    emailVerified?: boolean | null;
    accessToken: {
      token: string
      expirationDate: number
    }
    refreshToken: {
      token: string
      expirationDate: number
    }
  }

  interface Session {
    user:{
      id: string
      firstName?: string | null
      email?: string | null
      lastName?: string | null
      userType: string | null
      emailVerified?: boolean | null;
      accessToken: {
        token: string
        expirationDate: number
      }
      refreshToken: {
        token: string
        expirationDate: number
      }
    }
  }
}

// JWT modülünü genişletiyoruz.
declare module 'next-auth/jwt' {
  interface JWT {
    user: {  id: string
      firstName?: string | null
      email: string 
      lastName?: string | null
      userType: string | null
      emailVerified?: boolean | null;
      accessToken: {
        token: string
        expirationDate: number
      }
      refreshToken: {
        token: string
        expirationDate: number
      }
    }
   
  }
}
