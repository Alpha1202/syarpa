import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native'

import { blue, white, border_Blue } from '../constants/colors'
import { BoldText } from './Text'

const Button = ({
  title,
  icon = null,
  handlePress,
  textStyle = {},
  style = {},
  iconStyle = {},
  loading = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.ButtonWrapper, ...style }}
      onPress={() => {
        if (handlePress) handlePress()
      }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" animating />
      ) : (
        <>
          <BoldText style={{ ...styles.ButtonText, ...textStyle }}>
            {title}
          </BoldText>
        </>
      )}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  ButtonWrapper: {
    width: '100%',
    backgroundColor: blue,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    borderColor: border_Blue,
    flexDirection: 'row',
  },
  ButtonText: {
    color: white,
    fontWeight: '600',

    fontFamily: 'NunitoSans-Regular',
    fontStyle: 'normal',
    fontSize: 15,
  },
  chatIconWrapper: {
    marginRight: 10,
  },
})
