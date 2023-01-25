import React from 'react'
import LoopIcon from '@mui/icons-material/Loop';

function LoadingIndicator() {
  return (
    <div className='loadingContainer'><LoopIcon color='info' fontSize='large' className='loadingIcon'/></div>
  )
}

export default LoadingIndicator