import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import MainStack from './rootStack'

const index = () => (
  <NavigationContainer>
    <MainStack />
  </NavigationContainer>
)

export default index
