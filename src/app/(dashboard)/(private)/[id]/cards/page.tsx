// pages/cards/[id].tsx
import { GetCardsByColelctionId } from '@/Services/CardServices'
import CardsView from '@/views/pages/Cards'
import { Grid } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'

type Props = {
  cardData: Awaited<ReturnType<typeof GetCardsByColelctionId>>
}

const CardPage: NextPage<Props> = ({ cardData }) => (
  <Grid container justifyContent="center" width="100vw" height="100vh">
    <CardsView CardData={cardData} />
  </Grid>
)

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const id = Number(params?.id)
  const data = await GetCardsByColelctionId(id)
  return { props: { cardData: data } }
}

export default CardPage
