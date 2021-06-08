import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Vieww, SafeAreaView, ScrollView, Image } from 'react-native';
import firebase from '../database/firebase';


export default function MyClasses({ navigation }) {
    // query for classes where admin == uid and date > current date
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.classText}>
                My classes
            </Text>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerScroll: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    classText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: "black",
    },
    titleText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: "black",
    },
    descText: {
        fontFamily: 'Poppins-Light',
        fontSize: 14,
        color: "black",
    },
    testImg: {
        width: 275,
        height: 120,
    }
});
