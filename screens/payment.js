import React, { useState, useEffect } from 'react'
import {SafeAreaView, StyleSheet, Keyboard, View, Text, TouchableOpacity } from 'react-native'
import axios from 'axios'
import * as Animatable from 'react-native-animatable'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import {PaymentView} from '../components/PaymentView'
import TextInput from '../components/Input'
import Button from '../components/Button'
import { BoldText } from '../components/Text'

const PaymentScreen = ({ navigation }) => {
  const [response, setResponse] = useState()
  const [inputError, setInputError] = useState()
  const [makePayment, setMakePayment] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')
  const [amountError, setAmountError] = useState(false)
  const [ amount, setAAmount ] = useState('')


  const onCheckStatus = async (paymentResponse) => {
    
    let response = JSON.parse(paymentResponse)

    if(response.error) {
      return (
        setInputError(response.error.message)
        )
    }
    setPaymentStatus('Please wait while confirming your payment...')
    setResponse(response)

    try {

        const stripeResponse = await axios({
          method: 'POST',
          url: 'https://us-central1-syarpa-challenge.cloudfunctions.net/completePayment',
          data: {
            amount,
            currency: 'usd',
            token: response.token.id
          }
        })
        console.log(stripeResponse, 'stripeResponse1234')
        if(stripeResponse){

            const { paid } = stripeResponse.data;
            if(paid === true){
                setPaymentStatus('Payment Success')
            }else{
                setPaymentStatus('Payment failed due to some issue')
            }

        }else{
            setPaymentStatus(' Payment failed due to some issue')
        }

    } catch (error) {

        console.log(error)
        setPaymentStatus(' Payment failed due to some issue')

    }
  }
  const proceedToPay = () => {
    if(!amount) {
    
      return setAmountError(true)
    } setMakePayment(true)
  }
  const paymentUI = () => {
    if (!makePayment) {
      return (
        <View style={{ flex: 1, width:"90%", alignSelf: 'center', justifyContent:'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 25, margin: 10 }}> Make Payment </Text>
          <TextInput label="Enter Amount" placeholder="enter any amount" value={amount} onChangeText={(value) => {setAmountError(false), setAAmount(value)}} keyboardType="numeric"  />
          <Text style={[{  fontSize: 16, margin: 10 }, amountError && { color: 'red'}]}> {amountError ? 'Enter a valid amount' : `Payable Amount: ${amount || 0}`}</Text>

          {inputError && (
            <Animatable.Text animation="fadeInLeft" duration={50} style={{marginBottom: 10, color: 'red', textAlign: 'center', fontStyle: 'italic' }}>
             {inputError}
            </Animatable.Text>
          )}

          <Button title="Proceed To Pay" handlePress={() => proceedToPay()} loading={false} />
        </View>
      )
    } 
    else {
      if(response !== undefined) {
        return (
          <View style={{flex: 1, width:"90%",alignSelf: 'center',  justifyContent:'center', alignItems: 'center'}}>
            { paymentStatus === 'Payment Success' && <AntDesign name="checkcircle" style={{marginBottom: 10 }} size={40} color="green" />}
            { paymentStatus === 'Payment failed due to some issue' && <MaterialIcons name="cancel" style={{marginBottom: 10 }} size={40} color="green" />}
            <Animatable.Text animation="fadeInLeft" duration={50} style={{marginBottom: 10, marginTop: 10, color: 'green', textAlign: 'center', fontSize: 20 }}>
            
             { paymentStatus }
            
            </Animatable.Text>
            { paymentStatus !== 'Please wait while confirming your payment...' &&   <Button title="All Done" handlePress={() => navigation.navigate('welcome')} loading={false} />}
          </View>
        )
      } 
      else {
        return (
          <PaymentView onCheckStatus={onCheckStatus} country='us' currency='usd' amount={amount}/>
        )
      }
    }
  }

  return <SafeAreaView onStartShouldSetResponder={() => Keyboard.dismiss()} style={styles.container}>{paymentUI()}</SafeAreaView>
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 100,
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    // alignSelf: 'center' 
  }
})

export default PaymentScreen
