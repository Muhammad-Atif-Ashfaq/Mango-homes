import { Box, styled } from '@mui/material'
import React from 'react'
const StyledFooter = styled(Box)(({theme})=> ({
    height:'30vh',
    background:theme.palette.primary.main
}))
const Footer = () => {
  return (
    <StyledFooter>
      This is Footer
    </StyledFooter>
  )
}

export default Footer
