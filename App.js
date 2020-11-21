import { StatusBar } from 'expo-status-bar'
import React from 'react'
import 'react-native-gesture-handler'
import { useFonts } from '@use-expo/font'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'

import store from './store'
import Navigation from './navigation'


const customFonts = {
  'NunitoSans-Bold': require('./assets/fonts/NunitoSans/NunitoSans-Bold.ttf'),
  'NunitoSans-Regular': require('./assets/fonts/NunitoSans/NunitoSans-Regular.ttf'),
  'NunitoSans-Light': require('./assets/fonts/NunitoSans/NunitoSans-Light.ttf'),
}

const App = () => {
  const [fontsLoaded] = useFonts(customFonts)
  return fontsLoaded ? (
    <>
      <StatusBar backgroundColor="#fcfcfc" barStyle="dark-content" animated />
      <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
      </Provider>
    </>
  ) : (
    <View style={styles.container} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
})

export default App
