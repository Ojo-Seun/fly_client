import React from 'react'
import { Stack, Rating,Typography } from '@mui/material';


type valueProps = {
  value:number
}
function RatingIcons({value}:valueProps) {
  return (
    <Stack>
      <Rating value={value} readOnly={true} precision={0.5}/>
    </Stack>
  )
}

export default RatingIcons