import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Signup(props) {
  const[display, setDisplay] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[region, setRegion] = useState([]);
  const[isUser, setUser] = useState(false);
  const[role, setRole] = useState("Business");
  const[isLoading, setLoading] = useState(false);
  const[items, setItems] = useState([
    { label: 'East', value: 'east' },
    { label: 'West', value: 'west' },
    { label: 'North', value: 'north' },
    { label: 'South', value: 'south' },
    { label: 'Central', value: 'central' },
    { label: 'Others', value: 'others' }]);
  const[open, setOpen] = useState(false);

/*  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  } */

  const toggleFunction = () => {
    if (isUser) {
      setUser(false)
      setRole('Business')
    } else {
      setUser(true)
      setRole('User')
    }
  }

  const registerUser = () => {
    if (email === '' && password === '') {
      Alert.alert('Enter details to sign up!')
    } else {
      setLoading(true)
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = firebase.auth().currentUser
        user.updateProfile({displayName: display})
        user.updateProfile({photoURL: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"})
        firebase.firestore().collection("Accounts")
            .doc(email)
            .set({
                name: display,
                email: email,
                isUser: isUser,
                region: region,
            })
        console.log('User registered successfully!')
        setLoading(false);
        setDisplay("");
        setEmail("");
        setPassword("");
        if (isUser) {
          props.navigation.navigate('Login')
        } else {
          props.navigation.navigate('RegisterBusiness', {email: email})
        }
      })
      .catch(error => {this.setState({ errorMessage: error.message })
        console.log("error", error.message, error.code)
        switch (error.code)
            {
            case "auth/invalid-email":
              setLoading(false);
              setDisplay("");
              setEmail("");
              setPassword("");
            Alert.alert("Username/Email is invalid")
            break;

            case "auth/email-already-in-use":
              setLoading(false);
              setEmail("");
              setPassword("");
            Alert.alert("Username/Email is invalid as it already exists")
            break;

            case "auth/weak-password":
              setLoading(false);
              setEmail("");
              setPassword("");
            Alert.alert("Password is invalid, requires minimum 6 characters")
            break;

            default:
              Alert.alert("Invalid user")
              setLoading(false);
              setEmail("");
              setPassword("");
          }
        }
      )
    }
  }

  if (isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create new account</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={display}
          onChangeText={(val) => setDisplay(val)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val.toLowerCase())}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          maxLength={15}
          secureTextEntry={true}
        />

        <View alignItems="center">
          <DropDownPicker
            min={1}
            placeholder="Select a region"
            open={open}
            value={region}
            items={items}
            setOpen={setOpen}
            setValue={setRegion}
            setItems={setItems}
            placeholderStyle={{ color: "grey" }}
            dropDownDirection='TOP'
            selectedItemLabelStyle={styles.selectedText}
            listItemLabelStyle={styles.pickerText}
            onChangeValue={(value) => console.log(value)}
            containerStyle={styles.pickerMenu}
            placeholderStyle={styles.pickerText}
          />
        </View>

        {isUser ?
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.buttonLeft, styles.buttonOn]}
              disabled={true}
            >
              <Text style={styles.buttonTextOn}>I'M A USER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonRight, styles.buttonOff]}
              onPress={toggleFunction}
            >
              <Text style={styles.buttonTextOff}>I'M A BUSINESS</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.buttonLeft, styles.buttonOff]}
              onPress={toggleFunction}
            >
              <Text style={styles.buttonTextOff}>I'M A USER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonRight, styles.buttonOn]}
              disabled={true}
            >
              <Text style={styles.buttonTextOn}>I'M A BUSINESS</Text>
            </TouchableOpacity>
          </View>
        }

        <TouchableOpacity style={styles.button}
          onPress={registerUser}>
          <Text fontFamily='Poppins-Light'>SIGN UP</Text>
        </TouchableOpacity>

        <Text
          style={styles.loginText}
          onPress={() => props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>
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
    color: '#3740FE',
    fontFamily: 'Poppins-Medium'
  },
  buttonTextOn: {
    color: 'white',
    fontFamily: 'Poppins-Medium'
  },
  buttonTextOff: {
    color: 'grey',
    fontFamily: 'Poppins-Light'
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
  buttonLeft: {
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginVertical: 10,
    margin: 0,
  },
  buttonRight: {
    alignItems: "center",
    padding: 10,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginVertical: 10,
    margin: 0,
  },
  buttonOff: {
    backgroundColor: "#DDDDDD",
  },
  buttonOn: {
    backgroundColor: '#3740FE',
  },
  pickerMenu: {
    width: 300,
    margin: 10,
  },
  selectedText: {
    color: '#3740FE',
    fontFamily: 'Poppins-Bold',
  },
  pickerText: {
    color: '#A6A6A6',
    fontFamily: 'Poppins-Medium',
  },
  selectText: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginTop: 10,
  },
});