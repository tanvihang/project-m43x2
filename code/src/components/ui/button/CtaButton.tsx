import { View, Text, Button } from 'react-native'
import React, { ComponentPropsWithoutRef } from 'react'

type CtaButtonProps = ComponentPropsWithoutRef<typeof Button>

const CtaButton = (props: CtaButtonProps) => {
  return (
    <Button {...props} />
  )
}

export default CtaButton