import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import firebase from '../database/firebase';

export default function HomeScreen() {
    const [imageUrl, setImageUrl] = useState(undefined);

    useEffect(() => {
        firebase
            .firestore()
            .collection('Classes')
            .doc('TIi1azTXvSmzUD84wi4l')
            .get()
            .then((snapshot) => {
                setImageUrl(snapshot.data().pic)
            })
            .catch((e) => console.log('Errors while downloading => ', e));
      }, []);
    

    return (
        <SafeAreaView style={styles.container}> 
        <Image
            style={styles.image}
            source={{uri : imageUrl}}
        />
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
    image: {
        width: 300,
        height: 150,
    },
});

