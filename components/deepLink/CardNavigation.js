import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Home from './navigationCards/Home';
import Contact from './navigationCards/Contact';
import Offer from './navigationCards/Offer';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const Stack = createStackNavigator();

export default class CardNavigation extends Component {
  // hendleDeepLinking = () => {};
  // handleLink = async link => {
  //   try {
  //     const navigation = useNavigation();
  //     let url = link.url.split('=').pop()
  //     console.log('handleLink:-', url);
  //     navigation.navigate('contact');
  //   } catch (e) {
  //     console.log('handleLink Error:-', e);
  //   }

  //   // return null;
  // };
  // unsubscribe = () => {
  //   const unsubscribe = dynamicLinks().onLink(link => this.handleLink(link));
  //   return () => unsubscribe;
  // };
  // componentDidMount() {
  //   this.unsubscribe();
  // }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="contact" component={Contact} />
          <Stack.Screen name="offer" component={Offer} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});
