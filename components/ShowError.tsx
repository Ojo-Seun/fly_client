import React from 'react'

type props = {
    children:React.ReactNode
}

const styleCss = {
    backgroundColor: "pink",
    padding: "2rem",
}


function ShowError({children}:props) {
  return (
      <div style={styleCss}>{children}</div>
  )
}

export default ShowError