import { GetCardsByColelctionId } from '@/Services/CardServices'
import CardsView from '@/views/pages/Cards'
import { Grid } from '@mui/material'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

const Card = async ({ params }: Props) => {
  const id = Number(params.id)
  const data = await GetCardsByColelctionId(id)

  return (
    <Grid container justifyContent={"center"} width={"100vw"} height={"100vh"}>
      <CardsView CardData={data} />
    </Grid>
  )
}

export default Card
