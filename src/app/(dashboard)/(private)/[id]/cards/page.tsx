import { GetCardsByColelctionId } from '@/Services/CardServices'
import CardsView from '@/views/pages/Cards'
import { Grid } from '@mui/material'

export default async function Page({ params }: { params: { id: string } }) {
  const data = await GetCardsByColelctionId(Number(params.id))

  return (
    <Grid container justifyContent="center" width="100vw" height="100vh">
      <CardsView CardData={data} />
    </Grid>
  )
}
