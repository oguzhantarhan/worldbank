import FlashCard from '@/components/flash-card/flashCard'
import { GetUserCollection } from '@/Services/CollectionServices'
import StudyView from '@/views/pages/Study'
import { Grid } from '@mui/material'
import React from 'react'

const Card = async() => {
   const collections=await GetUserCollection()
  return (
<StudyView collectionList={collections}/>
  )
}

export default Card