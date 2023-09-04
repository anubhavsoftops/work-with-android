import { Text, View } from 'react-native'
import React, { Component } from 'react'
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics()

const { biometryType } = await rnBiometrics.isSensorAvailable()

 if (biometryType === BiometryTypes.Biometrics) {
        //do something face id specific
      }

export default class Biometrics extends Component {
   
  render() {
    return (
      <View>
        <Text>Biometrics</Text>
      </View>
    )
  }
}