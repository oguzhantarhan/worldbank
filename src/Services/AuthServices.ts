import { DataErrorType } from "@/types/types"
import axiosServerInstance from "./AxiosServer"
import { RegisterRequest } from "@/types/Services/AuthTypes"
export const RegisterService = async (data:RegisterRequest) => {
    try {
      const result = await axiosServerInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/Auth/register`,
       data
      )
      return { data: result.data, errorMessage: '', error: false } as DataErrorType<null>
    } catch (error: any) {
      if (error.response) {
        return {
          data: null,
          errorMessage: error.response.data.detail,
          error: true
        } as DataErrorType<null>
      } else if (error.request) {
        return {
          data: null,
          errorMessage: 'Server Error!',
          error: true
        } as DataErrorType<null>
      } else {
        return {
          data: null,
          errorMessage: error.message,
          error: true
        } as DataErrorType<null>
      }
    }
  }