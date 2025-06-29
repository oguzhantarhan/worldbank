import { GetCardsByColelctionId } from '@/Services/CardServices'
import CardsView from '@/views/pages/Cards'
import { Grid } from '@mui/material'

export default async function Page({ params }: { params: Record<string, string> }) {
  const id = Number(params.id)
  const data = await GetCardsByColelctionId(id)

  return (
    <Grid container justifyContent="center" width="100vw" height="100vh">
      <CardsView CardData={data} />
    </Grid>
  )
}
