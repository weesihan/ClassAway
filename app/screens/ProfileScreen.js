import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';

export default function ProfileScreen({ navigation }) {

    const logout = () => {
        firebase
        .auth()
        .signOut()
        .then(() => {navigation.navigate("Splash")})
    }

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.classText}>
            Welcome back {firebase.auth().currentUser.displayName}!
        </Text>
        <TouchableOpacity style={styles.button}
            onPress={logout}
        >
        <Text>LOG OUT</Text>
        </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6559ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    classText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: "black",
    },
    button: {
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        backgroundColor: "white",
        margin: 5,
    },
});
