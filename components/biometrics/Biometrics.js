import {Text, View, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import React, {Component} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});
// const rnBiometrics = new ReactNativeBiometrics();
// const { biometryType } = await rnBiometrics.isSensorAvailable()

export default class SetBiometrics extends Component {
  isBiometricSupport = async () => {
    try {
      let {available, biometryType} = await rnBiometrics.isSensorAvailable();
      console.log(available, biometryType, BiometryTypes.Biometrics);

      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported', biometryType);
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported', biometryType);
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported', biometryType);
        rnBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint',cancelButtonText:'Cancel'})
        .then((resultObject) => {
          const { success } = resultObject
      
          if (success) {
            console.log('successful biometrics provided')
            alert('fingerprint match')
          } else {
            console.log('user cancelled biometric prompt')
          }
        })
        .catch(() => {
          console.log('biometrics failed')
        })
      } else {
        console.log('Biometrics not supported', biometryType);
      }
    } catch (e) {
      console.log('error-->', e);
    }
  };
  componentDidMount() {
    // console.log(rnBiometrics.isSensorAvailable());
    // rnBiometrics.isSensorAvailable().then(resultObject => {
    //   const {available, biometryType} = resultObject;
    //   console.log(' available ----> ', available);
    //   console.log(' biometryType ----> ', biometryType);
    //   if (available && biometryType === BiometryTypes.TouchID) {
    //     console.log('TouchID is supported');
    //   } else if (available && biometryType === BiometryTypes.FaceID) {
    //     console.log('FaceID is supported');
    //   } else if (available && biometryType === BiometryTypes.Biometrics) {
    //     console.log('Biometrics is supported');
    //   } else {
    //     console.log('Biometrics not supported');
    //   }
    // });
    // this.isBiometricSupport();
  }

  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 30,
          }}>
          <Text>Biometrics</Text>
          <TouchableOpacity
            onPress={() => this.isBiometricSupport()}
            style={{
              width: '100%',
              backgroundColor: 'tomato',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginBottom: 30,
            }}>
            <Text>Hit Finger</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
