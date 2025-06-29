"use server"
import { DataErrorType } from "@/types/types"
import axiosServerInstance from "./AxiosServer"
import { CollectionType } from "@/types/Services/CollectionsServiceTypes"
export const GetUserCollection = async () => {
    try {
      const result = await axiosServerInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/CardCollections/GetCardCollectionList`
      )
      return { data: result.data, errorMessage: '', error: false } as DataErrorType<CollectionType[]>
    } catch (error: any) {
        console.log(error);
        
      if (error.response) {
        return {
          data: [],
          errorMessage: error.response.data.detail,
          error: true
        } as DataErrorType<CollectionType[]>
      } else if (error.request) {
        return {
          data: [],
          errorMessage: 'Server Error!',
          error: true
        } as DataErrorType<CollectionType[]>
      } else {
        return {
          data: [],
          errorMessage: error.message,
          error: true
        } as DataErrorType<CollectionType[]>
      }
    }
  }

  export const AddCollection = async (data:{collectionName:string,collectionDescription:string,newCardCount:number}) => {
    console.log(data);
    
    try {
    const response= await axiosServerInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/CardCollections/CreateCardCollection`,data
      )
      return { data: response.data, errorMessage: '', error: false } as DataErrorType<CollectionType>
    } catch (error: any) {
      console.log(error);
      
      if (error.response) {
        return {
          data: null,
          errorMessage: error.response.data.detail,
          error: true
        } as DataErrorType<null>
      } else if (error.request) {
        return {
          data:null,
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
  export const EditCollection = async (data:{collectionDescription:string,collectionName:string,id:number,newCardCount:number}) => {
    try {
   const response=  await axiosServerInstance.put(
        `${process.env.NEXT_PUBLIC_API_URL}/CardCollections/UpdateCollection`,data
      )
      return { data: response.data, errorMessage: '', error: false } as DataErrorType<CollectionType>
    } catch (error: any) {
      
      if (error.response) {
        return {
          data: null,
          errorMessage: error.response.data.detail,
          error: true
        } as DataErrorType<null>
      } else if (error.request) {
        return {
          data:null,
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
  
  export const DeleteCollection = async (id:number) => {
    try {
     await axiosServerInstance.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/CardCollections/${id}`,
      )
      return { data:null , errorMessage: '', error: false } as DataErrorType<null>
    } catch (error: any) {
      
      if (error.response) {
        return {
          data: null,
          errorMessage: error.response.data.detail,
          error: true
        } as DataErrorType<null>
      } else if (error.request) {
        return {
          data:null,
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