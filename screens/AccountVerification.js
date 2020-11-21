import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { AntDesign } from '@expo/vector-icons'

import { validateAccount } from '../actions/validateAccount'

import TextInput from '../components/Input'
import Button from '../components/Button'
import Text, { BoldText } from '../components/Text'


const AccountVerification = ({ route, navigation }) => {
  const { username } = route.params
  const [bankAccount, setBankAccount] = useState('')
  const [sortCode, setSortCode] = useState('')
  const [invalidBankAccount, setInvalidBankAccount] = useState(false)
  const [invalidSortCode, setInvalidSortCode] = useState(false)
  const dispatch = useDispatch()
  const { validateAccountData, validatingAccount, validateAccountStatus} = useSelector((state) => state.validateAccount)

  const handleValidate = async () => {
      Keyboard.dismiss()
    const formattedBankAccount = bankAccount.trim()
    const formattedSortCode = sortCode.trim()

    if (formattedBankAccount.length < 6 || formattedBankAccount.length > 10) {
        setInvalidBankAccount(true)
        return
    } else if(formattedSortCode.length !== 6) {
        setInvalidSortCode(true)
        return
    }

     dispatch(validateAccount(bankAccount, sortCode))
  }

  return (
    <SafeAreaView
      onStartShouldSetResponder={() => Keyboard.dismiss()}
      style={styles.container}
    >
      <BoldText>
        {validateAccountStatus === 'success?' ? 'Account Verified' : 'Account Verification'}
      </BoldText>

      {validateAccountStatus === 'failed' && (
        <>
        <Animatable.View style={{width: '100%'}} animation="fadeInRight" duration={500}>

          <TextInput label="Enter Bank Account" maxLength={10} value={bankAccount} onChangeText={(value) => { setInvalidBankAccount(false), setBankAccount(value)}} keyboardType="number-pad" />
          
          {invalidBankAccount && (
            <Animatable.Text animation="fadeInLeft" duration={500} style={{marginBottom: 7, color: 'red', textAlign: 'center', fontStyle: 'italic' }}>
              Account number must be between 6-10 digits long.
            </Animatable.Text>
          )}

          <TextInput label="Enter Sort code" maxLength={6} value={sortCode} onChangeText={(value) => { setInvalidSortCode(false), setSortCode(value)}} keyboardType="number-pad" />
          
          {invalidSortCode && (
            <Animatable.Text animation="fadeInLeft" duration={500} style={{ marginBottom: 7, color: 'red', textAlign: 'center', fontStyle: 'italic' }}>
              Sort code must be 6 digits long.
            </Animatable.Text>
          )}

          <Button handlePress={() => handleValidate()} title='Validate' loading={validatingAccount} />
        
        
        </Animatable.View>
       {Object.keys(validateAccountData).length > 0 && (
        <>
          <Text style={{ marginBottom: 7, marginTop: 10,  color: 'red', textAlign: 'center', fontStyle: 'italic' }}>
           Account Verification Failed
          </Text>
        <Button handlePress={() => navigation.navigate('payment', { username }) } title='Proceed to Payment' />
        </>
        )}
       </>
      ) }

      {validateAccountStatus === 'success?' && (

        <Animatable.View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}} animation="fadeInRight" duration={500}>
          <AntDesign name="checkcircle" style={{marginBottom: 7, marginTop: 10}} size={40} color="green" />
          <Text style={{ marginBottom: 10, marginTop: 10, color: 'green', textAlign: 'center', fontStyle: 'italic' }}>
           Account Verified
          </Text>
          <Button handlePress={() => navigation.navigate('payment', { username })} title='Proceed to Payment'/>
        </Animatable.View>
      
      )}
       
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
  },
})

export default AccountVerification
