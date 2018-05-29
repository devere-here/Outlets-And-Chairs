import React from 'react'
import { View } from 'native-base'

const Spacer = ({ size }) => (
  <View style={{ flex: 1, height: size }} />
)

Spacer.defaultProps = {
  size: 20,
}

export default Spacer
