"use server"
import { DataErrorType } from "@/types/types"
import axiosServerInstance from "./AxiosServer"
import { AddCardType, CardRelationType, EditCardtype, UpdateCardReletionType } from "@/types/Services/CardServiceTypes"


export const GetCardsByColelctionId = async (id:number) => {
    try {
      const result = await axiosServerInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/CardRelations/GetCardListByCollection`,
     {params:{
        collectionId:id
     }}
      )
      return { data: result.data, errorMessage: '', error: false } as DataErrorType<CardRelationType[]>
    } catch (error: any) {
        console.log(error);
        
      if (error.response) {
        return {
          data: [],
          errorMessage: error.response.data.detail,
          error: true
        } as DataErrorType<CardRelationType[]>
      } else if (error.request) {
        return {
          data: [],
          errorMessage: 'Server Error!',
          error: true
        } as DataErrorType<CardRelationType[]>
      } else {
        return {
          data: [],
          errorMessage: error.message,
          error: true
        } as DataErrorType<CardRelationType[]>
      }
    }
  }
   export const AddCard = async (data:AddCardType) => {
    try {
       const response= await axiosServerInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/CardRelations/AddCard`,
   data
      )
      return { data: response.data, errorMessage: '', error: false } as DataErrorType<CardRelationType>
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
  export const EditCard = async (data:EditCardtype) => {
    console.log(data);
    
    try {
       const response= await axiosServerInstance.put(
        `${process.env.NEXT_PUBLIC_API_URL}/CardRelations/UpdateCard`,
   data
      )
      return { data: response.data, errorMessage: '', error: false } as DataErrorType<CardRelationType>
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
  export const DeleteCard = async (id:number) => {
    try {
     await axiosServerInstance.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/CardRelations/${id}`,
      )
      return { data:null , errorMessage: '', error: false } as DataErrorType<null>
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

  export const ToggleCardVisibility = async (id:number) => {

    
    try {
       const response= await axiosServerInstance.put(
        `${process.env.NEXT_PUBLIC_API_URL}/CardRelations/ToggleCardVisibility/${id}`
      )
      return { data: response.data, errorMessage: '', error: false } as DataErrorType<null>
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
  export const UpdateCardReletion = async (data:UpdateCardReletionType) => {
    try {
     await axiosServerInstance.put(
        `${process.env.NEXT_PUBLIC_API_URL}/CardRelations/UpdateCardRelation`,
   data
      )
      return { data: null, errorMessage: '', error: false } as DataErrorType<null>
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
  export const GetStudyList = async (id:number) => {
    try {
      const result = await axiosServerInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/CardRelations/GetSudyList`,
     {params:{
      cardCollectionId:id
     }}
      )
      return { data: result.data, errorMessage: '', error: false } as DataErrorType<CardRelationType[]>
    } catch (error: any) {
        console.log(error);
        
      if (error.response) {
        return {
          data: [],
          errorMessage: error.response.data.detail,
          error: true
        } as DataErrorType<CardRelationType[]>
      } else if (error.request) {
        return {
          data: [],
          errorMessage: 'Server Error!',
          error: true
        } as DataErrorType<CardRelationType[]>
      } else {
        return {
          data: [],
          errorMessage: error.message,
          error: true
        } as DataErrorType<CardRelationType[]>
      }
    }
  }