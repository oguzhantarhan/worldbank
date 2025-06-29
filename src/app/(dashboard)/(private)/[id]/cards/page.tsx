import { GetCardsByColelctionId } from '@/Services/CardServices'
import CardsView from '@/views/pages/Cards'
import { Grid } from '@mui/material'
import React from 'react'

const Card = async ({ params }: { params: { id: number } }) => {
  const { id } = params
  const data = await GetCardsByColelctionId(id)

  return (
    <Grid container justifyContent={"center"} width={"100vw"} height={"100vh"}>
      <CardsView CardData={data} />
    </Grid>
  )
}

export default Card
