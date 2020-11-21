import React from 'react'
import { Text as NativeText } from 'react-native'

import { textColor as color } from '../constants/colors'

const Text = ({ style = {}, children, ...props }) => {
    return (
      <NativeText
        style={{
          fontFamily: 'NunitoSans-Regular',
          color,
          ...style,
        }}
        {...props}
      >
        {children}
      </NativeText>
    )
  }
  
  export default Text
  
  export const BoldText = ({ style = {}, children, ...props }) => {
    return (
      <NativeText
        style={{
          fontFamily: 'NunitoSans-Bold',
          color,
          ...style,
        }}
        {...props}
      >
        {children}
      </NativeText>
    )
  }
  
  export const LightText = ({ style = {}, children, ...props }) => {
    return (
      <NativeText
        style={{
          fontFamily: 'NunitoSans-Light',
          color,
          ...style,
        }}
        {...props}
      >
        {children}
      </NativeText>
    )
  }
  