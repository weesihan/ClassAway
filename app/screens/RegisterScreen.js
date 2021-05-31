import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import { SafeAreaView } from 'react-navigation';

export default class Signup extends Component {

  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isUser: false,
      role: 'Business',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  toggleFunction = () => {
    if (this.state.isUser) {
      this.setState({
        isUser: false,
        role: 'Business'
      })
    } else {
      this.setState({
        isUser: true,
        role: 'User'
      })
    }
  }

  registerUser = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to sign up!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        const uid = firebase.auth().currentUser.uid
        firebase.firestore().collection(this.state.role)
            .doc(uid)
            .set({
                name: this.state.displayName,
                email: this.state.email,
            })
        console.log(uid)
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        if (this.state.isUser) {
          this.props.navigation.navigate('Home')
        } else {
          this.props.navigation.navigate('RegisterBusiness', {uid: firebase.auth().currentUser.uid})
        }
      })
      .catch(error => {this.setState({ errorMessage: error.message })
      console.log("error", error.message, error.code)
      switch (error.code)
          {
          case "auth/invalid-email":
            this.setState({
              isLoading: false,
              email: '', 
              password: ''
            })
          Alert.alert("Username/Email is invalid")
          break;

          case "auth/invalid-email":
            this.setState({
              isLoading: false,
              email: '', 
              password: ''
            })
          Alert.alert("Username/Email is invalid")
          break;

          case "auth/weak-password":
            this.setState({
              isLoading: false,
              email: '', 
              password: ''
            })
          Alert.alert("Password is invalid, requires minimum 6 characters")
          break;

          default:
             Alert.alert("Invalid user")
             this.setState({
              isLoading: false,
              email: '', 
              password: ''
            })
          }
      })
    }
  }

  render() {

    if (this.state.isLoading) {
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
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />

        {this.state.isUser ?
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.buttonLeft, styles.buttonOn]}
              disabled={true}
            >
              <Text style={styles.buttonTextOn}>I'M A USER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonRight, styles.buttonOff]}
              onPress={this.toggleFunction}
            >
              <Text style={styles.buttonTextOff}>I'M A BUSINESS</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.buttonLeft, styles.buttonOff]}
              onPress={this.toggleFunction}
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
          onPress={this.registerUser}>
          <Text fontFamily='Poppins-Light'>SIGN UP</Text>
        </TouchableOpacity>

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>


      </View>
    );
  }
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
});