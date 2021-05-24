import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Image, SafeAreaView, Button, TouchableOpacity } from 'react-native';

const fetchFont = () => {
    Font.loadAsync({
      'Poppins-Bold': require("../assets/fonts/Poppins-Bold.ttf"),
      'Poppins-Medium': require("../assets/fonts/Poppins-Medium.ttf"),
      'Poppins-Light': require("../assets/fonts/Poppins-Light.ttf"),
    });
  }

export default function SplashScreen({ navigation }) {
    const [fontLoaded, setfontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFont}
                onError={() => console.log('ERROR')}
                onFinish={() => {
                    setfontLoaded(true);
                }}
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={require("../assets/icon.png")}
            />
            <Text style={styles.classText}>
                ClassAway
            </Text>

            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Register")}
            >
                <Text style={styles.imText}>SIGN UP</Text>
            </TouchableOpacity>

            <Text
                style={styles.imText}
                onPress={() => navigation.navigate("Login")}>
                Already have an account?
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
    tinyLogo: {
        width: 100,
        height: 100,
    },
    classText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: "white",
    },
    imText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        color: "white",
    },
    button: {
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#312996",
        margin: 5,
        width : 150,
    },
});
