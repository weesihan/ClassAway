import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';

export default function RegisterBusiness(props) {
    const [address, setAddress]= useState("");
    const [description, setDesc]= useState("");
    const [number, setNumber] = useState("");

    const registerDetails = () => {
        if (address === '' || description === '' || number === '' ) {
          Alert.alert('Enter details to sign up!')
        } else {
          firebase.firestore().collection("Accounts")
              .doc(props.route.params.email)
              .set({
                  address: address,
                  description: description,
                  number: number,
                  numRatings: 0,
                  totalRatings: 0
              }, { merge: true })
          console.log('Business registered successfully!')
          props.navigation.navigate('Login')
        }
      }

    return (
        <View style={styles.container}> 
          <Text style={styles.title}>Register Details</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />      
          <TextInput
            style={styles.inputStyle}
            placeholder="Description"
            value={description}
            onChangeText={setDesc}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Number"
            value={number}
            onChangeText={setNumber}
          />   
          <View style={{ flexDirection:"row" }}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => registerDetails()}
          >
          <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
          </View>
                              
        </View>
      );
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: 'center',
      padding: 35,
      backgroundColor: '#fff'
    },
    loginText: {
      color: '#3740FE',
      marginTop: 25,
      textAlign: 'center',
      fontFamily: 'Poppins-Medium',
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    inputStyle: {
      borderWidth: 1,
      borderColor: '#A6A6A6',
      borderRadius: 8,
      padding: 8,
      margin: 10,
      width: 300,
      fontFamily: 'Poppins-Medium',
      },
      buttonText: {
        color: 'black',
        fontFamily: 'Poppins-Medium'
      },
      title: {
      fontSize: 30,
      fontFamily: 'Poppins-Bold',
      },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      borderRadius: 8,
      fontFamily: 'Poppins-Medium',
      margin: 10,
    },
})