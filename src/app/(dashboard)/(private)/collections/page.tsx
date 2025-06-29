import { GetUserCollection } from '@/Services/CollectionServices'
import CollectionsView from '@/views/pages/Collections'
import { Grid } from '@mui/material'
import React from 'react'

const Collections = async() => {

  
  const collections=await GetUserCollection()
  return (


 <CollectionsView collectionList={collections}/>


  )
}

export default Collections