import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import WelcomeScreen from '../screens/welcome'
import AccountVerificationScreen from '../screens/AccountVerification'
import PaymentScreen from '../screens/payment'

const Stack = createStackNavigator()
const defaultOptions = {
    animationEnabled: false,
    headerStyle: {},
    headerBackTitle: null,
    headerLeftContainerStyle: {},
    headerRightContainerStyle: {},
    headerShown: false,
  }

const index = () => (
  <Stack.Navigator initialRouteName="welcome" headerMode="none" screenOptions={defaultOptions}>
    <Stack.Screen name="welcome" component={WelcomeScreen} />
    <Stack.Screen name="account-verification" component={AccountVerificationScreen} />
    <Stack.Screen name="payment" component={PaymentScreen} />
  </Stack.Navigator>
)

export default index
