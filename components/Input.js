import React, { useState, useRef } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native'

import Text from './Text'
import { textColor, input, textColorLight } from '../constants/colors'

const Input = ({
  style = null,
  coverStyle = null,
  labelStyle = null,
  value,
  onChangeText,
  label = null,
  keyboardType = 'default',
  placeholder = '',
  backgroundColor = 'transparent',
  color = textColor,
  placeholderTextColor = textColor,
  borderColor = input,
  multiline = false,
  maxLength,
  RightComponent = null,
  secureTextEntry = false,
  inputRef = null,
  autoCapitalize = 'sentences',
  editable = true,
  ...props
}) => {
  return (
    <>
      {label && (
        <Text
          style={{
            marginBottom: 7,
            marginTop: 5,
            color,
            width: '100%',
            ...labelStyle,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          width: '100%',
          height: multiline ? 100 : 40,
          backgroundColor: editable ? backgroundColor : textColorLight,
          borderColor,
          borderWidth: 1,
          borderRadius: 3,
          paddingHorizontal: 10,
          paddingVertical: multiline ? 10 : 0,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 5,
          ...coverStyle,
        }}
      >
        <TextInput
          style={{
            backgroundColor,
            color,
            width: '100%',
            height: '100%',
            fontSize: 14,
            textAlignVertical: multiline ? 'top' : 'center',
            flex: 1,
            fontFamily: 'NunitoSans-Regular',
            ...style,
          }}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          multiline={multiline}
          ref={inputRef}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          editable={editable}
          maxLength={maxLength}
          {...props}
        />
      </View>
    </>
  )
}

export default Input
