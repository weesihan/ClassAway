import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import firebase from '../database/firebase';
import Card from '../components/Card.js'


export default function MyClasses({ navigation }) {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        firebase
            .firestore()
            .collection('Classes')
            .where("admin", "==", firebase.auth().currentUser.email)
            .get()
            .then((snapshot) => {
                console.log(classes);
                snapshot.forEach((doc) => {
                    console.log(doc.data());
                    classes.push(doc.data());
                    console.log(classes)
                });

            })
            .catch((e) => console.log('Errors while downloading => ', e));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.classText}>
                My classes
            </Text>
            <FlatList data={classes} renderItem={({ item }) => (
                <View alignItems="center" justifyContent="center">
                    <Card>
                        <Image style={styles.cardImg} source={{ uri: item.pic }} />
                        <View style={styles.cardContent}>
                            <Text style={styles.titleText}>{item.title}</Text>
                            <Text style={styles.descText}>{item.description}</Text>
                        </View>
                    </Card>

                </View>
            )}
            />
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
        color: "#6559ff",
        margin: 10,
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
    cardImg: {
        width: 275,
        height: 150,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    image: {
        width: 300,
        height: 150,
    },
    cardContent: {
        marginHorizontal: 10,
        marginVertical: 10,
    },
});
