import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import firebase from '../database/firebase';
import { Avatar, Title, TouchableRipple } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export default function BusinessProfileScreen({ navigation }) {

    const logout = () => {
        firebase
        .auth()
        .signOut()
        .then(() => {navigation.navigate("Splash")})
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfo}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image 
                    source={{
                        uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                    }}
                    size={80}
                    />
                    <View style={{marginLeft: 20}}>
                    <Title style={[styles.title, {
                        marginTop:10,
                        marginBottom: 5,
                    }]}> {firebase.auth().currentUser.displayName} </Title>
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
                    <Text style={{color:"black", marginLeft: 20, fontFamily: 'Poppins-Medium'}}>Phone Number</Text>
                </View>
                <View style={styles.row}>
                    <AntDesign name="phone" color="black" size={20}/>
                    <Text style={{color:"black", marginLeft: 20, fontFamily: 'Poppins-Medium'}}>Address</Text>
                </View>
                <View style={styles.row}>
                    <AntDesign name="idcard" color="black" size={20}/>
                    <Text style={{color:"black", marginLeft: 20, fontFamily: 'Poppins-Medium'}}>Description</Text>
                </View>
            </View>
            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                    <AntDesign name="profile" color="black" size={25}/>
                    <Text style={styles.menuItemText}>All Classes</Text>
                </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                    <AntDesign name="setting" color="black" size={25}/>
                    <Text style={styles.menuItemText}>Settings</Text>
                </View>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
