export const dynamic = "force-dynamic"

import { GetUserCollection } from '@/Services/CollectionServices'
import StudyView from '@/views/pages/Study'
import React from 'react'

const Card = async() => {
   const collections=await GetUserCollection()
  return (
<StudyView collectionList={collections}/>
  )
}

export default Card