import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';


export default function HomeScreen({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.classText}>
            Hello!
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

