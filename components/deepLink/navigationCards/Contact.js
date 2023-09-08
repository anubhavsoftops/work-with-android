import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class Contact extends Component {
    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.txt}>Conatct</Text>
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
      txt: {fontSize: 40, textTransform: 'uppercase'},
    });