import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';

export default class Signup extends Component {
    
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to sign up!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Home')
      })
      .catch(error => this.setState({ errorMessage: error.message }))      
    }
  }

  render() {
    
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
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
        <View style={{ flexDirection:"row" }}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.registerUser()}
        >
        <Text style={styles.buttonText}>I'M A USER</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={() => this.registerUser()}
        >
        <Text style={styles.buttonText}>I'M A BUSINESS</Text>
        </TouchableOpacity>
        </View>
      

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
});