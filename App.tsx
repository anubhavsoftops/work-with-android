import {Text, View, Alert} from 'react-native';
import React, {Component} from 'react';
import GoogleSingnIn from './components/googleAuth/GoogleSignIn';
import SetBiometrics from './components/biometrics/Biometrics';

import messaging from '@react-native-firebase/messaging';
import DeepLink from './components/deepLink/rnDeepLink';
import CardNavigation from './components/deepLink/CardNavigation';

export default class App extends Component {
  componentDidMount() {
    // this.getDeviceToken();
  }
  // getDeviceToken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     console.log('token aaya-->', token);
  //     // Alert.alert(token);
  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //       Alert.alert(
  //         'A new FCM message arrived!',
  //         JSON.stringify(remoteMessage),
  //       );
  //     });

  //     return unsubscribe;
  //   } catch (e) {
  //     console.log('token-->', e);
  //   }
  // };

  render() {
    return (
      // <View>
      //   {/* <GoogleSingnIn/> */}
      //   {/* <SetBiometrics /> */}
      //   {/* <DeepLink/> */
      //   }
      //   {/* <Text>dfgbfhjk</Text> */}
      // </View>
      <CardNavigation />
    );
  }
}
