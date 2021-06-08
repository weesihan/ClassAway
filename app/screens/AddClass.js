import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';

export default function AddClass(props) {
    const [className, setClassName] = useState("");
    const [description, setDesc] = useState("");
    const [cost, setCost] = useState("");

    const [date, setDate] = useState("")

    const addClass = () => {
        // if any empty fields, alert 
        console.log("addClass pressed")
        firebase.firestore().collection("Classes").doc().set({
            title: className,
            description: description,
            cost: cost,
            date: date,
            admin: firebase.auth().currentUser.email
            //venue/author: current shop's name
            //time
            //difficulty:
            //tags:
            //pic:
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a class</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder="Class Name"
                value={className}
                onChangeText={setClassName}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Description"
                value={description}
                onChangeText={setDesc}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Cost"
                value={cost}
                onChangeText={setCost}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Date"
                value={date}
                onChangeText={setDate}
            />
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={addClass}
                >
                    <Text style={styles.buttonText}>CREATE CLASS</Text>
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