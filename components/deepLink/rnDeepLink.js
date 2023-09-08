import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Clipboard from '@react-native-clipboard/clipboard';
import Home from './navigationCards/Home';

export default class rnDeepLink extends Component {
  constructor(params) {
    super();
    this.state = {
      setLink: '',
    };
  }
  buildLink = async () => {
    const link = await dynamicLinks().buildLink({
      link: 'https://invertase.io',
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: 'https://apkconnect.page.link',
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      analytics: {
        campaign: 'banner',
      },
    });

    this.setState({setLink: link});
  };
  render() {
    return (
      <View style={[styles.container]}>
        <Text>{this.state.setLink}</Text>
        <TouchableOpacity onPress={() => this.buildLink()}>
          <Text>genrate Link</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Clipboard.setString(this.state.setLink)}>
          <Text>Copy Link</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#EEF4ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
