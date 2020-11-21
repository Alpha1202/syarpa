import React, { useState } from 'react'
import { SafeAreaView, StyleSheet,  Keyboard, } from 'react-native'

import TextInput from '../components/Input'
import Button from '../components/Button'
import { BoldText } from '../components/Text'


const welcome = ({ navigation }) => {
const [username, setUsername] = useState('')
  return (
    <SafeAreaView onStartShouldSetResponder={() => Keyboard.dismiss()} style={styles.container}>
      <BoldText>{username.trim().length < 1 ? 'Please enter any name to proceed' : `Welcome, ${username.trim()}` }</BoldText>
      <TextInput placeholder="eg: john doe" value={username} onChangeText={(value) => setUsername(value)}  />
      <Button handlePress={username.trim().length < 1 ? null : () => navigation.navigate('account-verification', { username })} title={ username.trim().length < 1 ? 'Enter' : 'Proceed to verify account' } />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center'
  },
})
export default welcome
