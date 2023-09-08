import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Share,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export default class Home extends Component {
  constructor(params) {
    super();
    this.state = {
      payload: 'contact',
      isLoading: false,
    };
  }

  handleLink = async link => {
    try {
      let url = link.url.split('=').pop();
      console.log('handleLink:-', url);
      this.props.navigation.navigate('contact');
    } catch (e) {
      console.log('handleLink Error:-', e);
    }

    // return null;
  };
  unsubscribe = () => {
    const unsubscribe = dynamicLinks().onLink(link => this.handleLink(link));
    return () => unsubscribe;
  };
  componentDidMount() {
    this.unsubscribe();
  }
  genrateLink = async () => {
    try {
      this.setState({isLoading: true});
      const link = await dynamicLinks().buildShortLink(
        {
          link: `https://apkconnect.page.link/productId=${this.state.payload}`,
          domainUriPrefix: `https://apkconnect.page.link`,
          android: {packageName: 'com.demo_sign_app'},
        },
        dynamicLinks.ShortLinkType.DEFAULT,
      );
      console.log('link:-', link);

      return link;
    } catch (e) {
      console.log('genrate link :-', e);
    }
  };
  shareLink = async () => {
    const getLink = await this.genrateLink();
    try {
      Share.share({message: getLink});
      this.setState({isLoading: false});
    } catch (e) {
      this.setState({isLoading: false});
      console.log('shareLink error:-', e);
    }
  };
  render() {
    return (
      <>
        {this.state.isLoading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={[styles.txt, {fontSize: 30, marginBottom: 40}]}>
              {this.state.setLink}
            </Text>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.shareLink()}>
              <Text style={styles.txt}>genrate Link</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
          style={styles.btn}
          onPress={() => Clipboard.setString(this.state.setLink)}>
          <Text style={styles.txt}>Copy Link</Text>
        </TouchableOpacity> */}
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  txt: {fontSize: 30, textTransform: 'uppercase', textAlign: 'center'},
  btn: {
    paddingVertical: 10,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
