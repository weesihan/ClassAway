import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen(props) {

    return (
        <SafeAreaView style={styles.container}> 
        <Text style={styles.classText}>
            Welcome back {firebase.auth().currentUser.displayName}!
        </Text>
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
});

