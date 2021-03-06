import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, ScrollView, RefreshControl, Alert } from 'react-native';
import firebase from '../database/firebase';
import { Avatar, Title, TouchableRipple } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export default function BusinessProfileScreen(props) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const email = firebase.auth().currentUser.email;

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    const wait = timeout => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
    };

    const getUser = async() => {
        await firebase.firestore()
        .collection('Accounts')
        .doc(email)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setUserData(documentSnapshot.data())
          }
          console.log(firebase.auth().currentUser.photoURL)
        })
        .catch((e) => console.log('Errors while retrieving => ', e));
      }

    useEffect(() => {
        getUser();
        props.navigation.addListener("focus", () => setLoading(!loading));
    }, [props.navigation, loading]);

    const logout = () => {
        firebase
        .auth()
        .signOut()
        .then(() => {props.navigation.navigate("Splash")})
    }

    return (
        <View style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={styles.userInfo}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image 
                    source={{
                        uri: firebase.auth().currentUser.photoURL,
                    }}
                    size={80}
                    />
                    <View style={{marginLeft: 20}}>
                    <Title style={[styles.title, {
                        marginTop:10,
                        marginBottom: 5,
                    }]}> {userData ? userData.name || "business" : ''} </Title>
                    <TouchableOpacity style={styles.button}
                        onPress={logout}
                    >
                    <Text>LOG OUT</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.userInfo}>
                <View style={styles.row}>
                    <AntDesign name="enviromento" color="black" size={20}/>
                    <Text style={{color:"black", marginLeft: 20, fontFamily: 'Poppins-Medium'}}>{userData ? userData.address || 'No details added.' : ''}</Text>
                </View>
                <View style={styles.row}>
                    <AntDesign name="phone" color="black" size={20}/>
                    <Text style={{color:"black", marginLeft: 20, fontFamily: 'Poppins-Medium'}}>{userData ? userData.number || 'No details added.' : ''}</Text>
                </View>
                <View style={styles.row}>
                    <AntDesign name="idcard" color="black" size={20}/>
                    <Text style={{color:"black", marginLeft: 20, fontFamily: 'Poppins-Medium'}}>{userData ? userData.description || 'No details added.' : ''}</Text>
                </View>
            </View>
            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => {props.navigation.navigate('BizPastClasses')}}>
                <View style={styles.menuItem}>
                    <AntDesign name="profile" color="black" size={25}/>
                    <Text style={styles.menuItemText}>Past Classes</Text>
                </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {props.navigation.navigate('BusinessSettings')}}>
                <View style={styles.menuItem}>
                    <AntDesign name="setting" color="black" size={25}/>
                    <Text style={styles.menuItemText}>Settings</Text>
                </View>
                </TouchableRipple>
            </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 50
    },
    userInfo:{
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    classText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: "black",
    },
    button: {
        alignItems: "center",
        padding: 7,
        borderRadius: 7,
        backgroundColor: "#DDDDDD",
        margin: 5,
        fontFamily: 'Poppins-Medium'
    },
    title: {
        fontFamily: 'Poppins-Bold',
        color: "black",
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: 'black',
        marginLeft: 20,
        fontWeight: '600',
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        lineHeight: 26,
    },
});