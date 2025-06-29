import { GetStudyList } from '@/Services/CardServices'

import StudyDashboardView from '@/views/pages/StadyDashboard'
import { Grid } from '@mui/material'
import React from 'react'

const StudyDashboard = async({ params }: { params: { id: number } }) => {
  const { id } = await params
  const data=await GetStudyList(id)
  return (
<Grid container justifyContent={"center"} width={"100vw"} height={"100vh"}>

 <StudyDashboardView studyList={data}  ></StudyDashboardView>

</Grid>
  )
}

export default StudyDashboard