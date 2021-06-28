import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import firebase from '../database/firebase';

export default function BizClassDetails(props) {
    const [classData, setClassData] = useState(null);
    const [date, setDate] = useState(new Object());
    const [adminData, setAdminData] = useState(null);
    const [currentClasses, setClasses] = useState(null);
    const id = props.route.params.id

    const getData = async () => {
        let query1 = await firebase.firestore()
            .collection('Classes')
            .doc(id)
            .get()

        const classdata = query1.data();
        const admin = query1.data().admin;
        const date = query1.data().date;
        setClassData(classdata);
        setDate(date);

        let query2 = await firebase.firestore()
            .collection('Accounts')
            .doc(admin)
            .get()

        const admindata = query2.data();
        setAdminData(admindata)

    }

    const getDate = (date) => {
        var t = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
        var hours = t.getHours();
        var minutes = t.getMinutes();
        var newformat = t.getHours() >= 12 ? 'PM' : 'AM';

        // Find current hour in AM-PM Format 
        hours = hours % 12;

        // To display "0" as "12" 
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var formatted =
            (t.toString().split(' ')[0])
            + ', ' + ('0' + t.getDate()).slice(-2)
            + '/' + ('0' + (t.getMonth() + 1)).slice(-2)
            + '/' + (t.getFullYear())
            + ' - ' + ('0' + t.getHours()).slice(-2)
            + ':' + ('0' + t.getMinutes()).slice(-2)
            + ' ' + newformat;
        return formatted
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                width: "100%",
                marginTop: 40
            }}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{
                        width: "50%"
                    }}
                >
                    <AntDesign
                        name="arrowleft" color="black" size={25}
                    />
                </TouchableOpacity>
                <View style={{
                    width: "50%",
                    alignItems: "flex-end"
                }}>
                    <AntDesign
                        name="search1" color="black" size={25}
                    />
                </View>
            </View>
            <ScrollView>
                <Image
                    source={{ uri: classData ? classData.pic || classData.pic : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F136211%2Fscreenshots%2F2008336%2Fbg-pattern-blue-sm.png&f=1&nofb=1" }}
                    style={{ height: 270, width: 375 }}
                />
                <View style={styles.header}>
                    <View style={{ width: "100%" }}>
                        <Text style={styles.subtitle}>{adminData ? adminData.name || adminData.name : 'Class Unavailable'}</Text>
                        <Text style={styles.title}>{classData ? classData.title || classData.title : 'Class'}</Text>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.subtitle}>About</Text>
                    <Text style={styles.description}>
                        {classData ? classData.description || classData.description : 'No Class Description Available'}
                    </Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.subtitle}>Address</Text>
                    <Text style={styles.description}>
                        {adminData ? adminData.address || adminData.address : 'No Class Address Available'}
                    </Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.subtitle}>Price Per Pax</Text>
                    <Text style={styles.description}>
                        ${classData ? classData.cost || classData.cost : 'No Class Price Available'}
                    </Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.subtitle}>Date</Text>
                    <Text style={styles.description}>{getDate(date)}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 20
    },
    classImage: {
        flex: 1,
        backgroundColor: "#FFF",
        marginTop: 20
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    title: {
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
    },
    descriptionContainer: {
        alignItems: "flex-start",
        marginTop: 10,
        width: "100%"
    },
    subtitle: {
        fontSize: 17,
        fontFamily: 'Poppins-Medium',
    },
    description: {
        fontSize: 17,
        fontFamily: 'Poppins-Light',
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    bookButton: {
        alignItems: "center",
        backgroundColor: "#B1B2F5",
        fontFamily: 'Poppins-Medium',
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
    }
});
