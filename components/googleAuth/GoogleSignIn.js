import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-async-storage/async-storage';
export default class GoogleSignIn extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: null,
      userData: null,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '438674749734-9kq6r8dnnut90ssr4ho63aqmgpb8d0bd.apps.googleusercontent.com',
    });
    this.getData();
  }
  storeData = async value => {
    // console.log('value-->', typeof value);
    let valueStr = JSON.stringify(value);
    try {
      await AsyncStorage.setItem('authData', valueStr);

      this.getData('authData');
    } catch (e) {
      // saving error
      console.log('setdata error-->', e);
    }
  };
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('authData');
      parseValue = JSON.parse(value);
      this.setState({userData: parseValue});
      console.log('get value ---> ', value);
    } catch (e) {
      console.log('get error -->', e);
    }
  };
  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('authData');
      this.setState({userData: null});
      console.log('remove success');
    } catch (e) {
      console.log('remove error--->', e);
    }

    console.log('Done.');
  };
  // googleSignin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     const {idToken} = await GoogleSignin.signIn();
  //     const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
  //     auth().signInWithCredential(googleCredentials);
  //     console.log(userInfo);
  //   //   return userInfo;
  //   } catch (error) {
  //     console.log('---sign In error--->', error);
  //   }
  // };
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // this.setState({userInfo: userInfo});
      this.storeData(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  signOut = async () => {
    try {
      await GoogleSignin.signOut();
      this.removeValue();
      // this.setState({userData: null}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    // console.log('data', this.state.userData);
    // console.log(this.getData());
    return (
      <SafeAreaView style={{backgroundColor: '#331E38'}}>
        <View style={[styles.conitainer]}>
          {/* <View style={[styles.userView]}>
            <Image source={require('./google.png')} />
            <Text style={[styles.userTxt]}>
              Name : {this.state.userInfo.user.name}
            </Text>
            <Text style={[styles.userTxt]}>
              Email : {this.state.userInfo.user.email}
            </Text>
          </View> */}
          {this.state.userData ? (
            <>
              <View style={[styles.userView]}>
                <Image
                  style={{width: 60, height: 60, borderRadius: 30,marginBottom:10}}
                  source={{
                    uri: this.state.userData?.user?.photo,
                  }}
                />
                <Text style={[styles.userTxt]}>
                  Name : {this.state.userData?.user?.name}
                </Text>
                <Text style={[styles.userTxt]}>
                  Email : {this.state.userData?.user?.email}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.googleBtn]}
                onPress={() => {
                  this.signOut();
                  console.log('hii');
                }}>
                <Image
                  style={[styles.googleBtnImg]}
                  source={require('./google.png')}
                />
                <Text style={[styles.btnTxt]}>Log Out</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.googleBtn]}
                onPress={() => {
                  this.signIn();
                  console.log('hii');
                }}>
                <Image
                  style={[styles.googleBtnImg]}
                  source={require('./google.png')}
                />
                <Text style={[styles.btnTxt]}>Connect with the Google</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  conitainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginHorizontal: 20,
  },
  userView: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  userTxt: {fontSize: 15, fontWeight: 'bold'},
  googleBtn: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1.5,
    paddingVertical: 6,
    alignItems: 'center',
    borderColor: 'tomato',
    flexDirection: 'row',
    backgroundColor: '#07090F',
  },
  googleBtnImg: {height: 40, width: 40, marginHorizontal: 15},
  btnTxt: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'tomato',
  },
});
