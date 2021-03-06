import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView, Share } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import firebase from '../database/firebase';
import Counter from "react-native-counters";

export default function ClassDetails(props) {
    const [classData, setClassData] = useState(null);
    const [date, setDate] = useState(new Object());
    const [numRatings, setNumRatings] = useState(0);
    const [totalRating, setTotalRating] = useState(0);
    const [adminData, setAdminData] = useState(null);
    const [isBooked, setBooked] = useState(false);
    const [liked, isLiked] = useState(false);
    const [hasPassed, setPassed] = useState(false);
    const [pax, setPax] = useState(1);
    const currentUser = firebase.auth().currentUser.email;
    const id = props.route.params.id;
    const currentDate = firebase.firestore.Timestamp.now();

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
        if (date < currentDate) {
            setPassed(true);
        }

        let query2 = await firebase.firestore()
            .collection('Accounts')
            .doc(admin)
            .get()

        setNumRatings(query2.data().numRatings);
        setTotalRating(query2.data().totalRating);
        const admindata = query2.data();
        setAdminData(admindata)

        await firebase.firestore()
            .collection('Accounts')
            .doc(currentUser)
            .collection('bookedClasses')
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setBooked(true)
                }
            })

        await firebase.firestore()
            .collection('Accounts')
            .doc(currentUser)
            .collection('favourites')
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    isLiked(true)
                }
            })
    }

    const getRating = () => {
        if (numRatings == 0 || numRatings == null) {
            return "Rating not available"
        }
        return (totalRating / numRatings).toFixed(2)
    }

    const favourite = async () => {

        if (!liked) {
            await firebase.firestore()
                .collection('Accounts')
                .doc(currentUser)
                .collection('favourites')
                .doc(id)
                .set({
                    classid: id,
                    date: date,
                    admin: adminData.name,
                    title: classData.title,
                    categories: classData.categories,
                    cost: classData.cost,
                    description: classData.description,
                    location: classData.location,
                    pic: classData.pic,
                })
            isLiked(true)
            console.log('Class has been liked')
        } else {
            await firebase.firestore()
                .collection('Accounts')
                .doc(currentUser)
                .collection('favourites')
                .doc(id)
                .delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                })
            isLiked(false)
        }
    }

    const book = async () => {

        if (hasPassed) {
            console.log('Class is over')
            Alert.alert('This class is no longer available!')
        }
        if (isBooked) {
            console.log('Class has been booked before')
            Alert.alert('You have already made a booking for this class!')
        } else {
            await firebase.firestore()
                .collection('Accounts')
                .doc(currentUser)
                .collection('bookedClasses')
                .doc(id)
                .set({
                    pax: pax,
                    classid: id,
                    date: date,
                    admin: adminData.name,
                    title: classData.title,
                    hasRated: false,
                })
                .then(() => {
                    Alert.alert('Class has been booked successfully!')
                })

            await firebase.firestore()
                .collection('Classes')
                .doc(id)
                .collection('Attendees')
                .doc(currentUser)
                .set({ pax: pax })
                .then(() => {
                    console.log('Attendee added')
                    setBooked(true);
                })
        }

    }
    const counter = (number) => {
        setPax(number)
        console.log(number)
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Join me in this class!',
                url: 'https://github.com/weesihan/ClassAway',
                title: 'ClassAway'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

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

    const renderElement = () => {
        if (liked) {
            return <TouchableOpacity
                onPress={favourite}>
                <AntDesign
                    name="heart" color="#6559ff" size={25}
                />
            </TouchableOpacity>
        }
        return <TouchableOpacity
            onPress={favourite}>
            <AntDesign
                name="hearto" color="black" size={25}
            />
        </TouchableOpacity>
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                width: "100%",
            }}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{
                        width: "100%"
                    }}
                >
                    <AntDesign
                        name="arrowleft" color="black" size={25}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Image
                    source={{ uri: classData ? classData.pic || classData.pic : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F136211%2Fscreenshots%2F2008336%2Fbg-pattern-blue-sm.png&f=1&nofb=1" }}
                    style={{ height: 270, width: 375 }}
                />
                <View style={styles.header}>
                    <View style={{ width: "80%" }}>
                        <Text style={styles.subtitle}>{adminData ? adminData.name || adminData.name : 'Class Unavailable'}</Text>
                        <Text style={styles.title}>{classData ? classData.title || classData.title : 'Class'}</Text>
                    </View>
                    <View style={{ width: "10%", alignItems: "flex-end" }}>
                        {renderElement()}
                    </View>
                    <View style={{ width: "10%", alignItems: "flex-end" }}>
                        <TouchableOpacity onPress={() => onShare()}>
                            <AntDesign
                                name="addusergroup" color="black" size={25}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 5 }}>
                        <AntDesign name='star' color='gold' size={20} />
                    </View>
                    <View>
                        <Text style={styles.description}>{getRating()}</Text>
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
                <View style={styles.descriptionContainer}>
                    <Text style={styles.subtitle}>About {adminData ? adminData.name || adminData.name : 'Unavailable'}</Text>
                    <Text style={styles.description}>{adminData ? adminData.description || adminData.description : 'Description Unavailable'}</Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.description}>Pax</Text>
                <Counter
                    buttonStyle={{ borderColor: '#333', borderWidth: 1 }}
                    buttonTextStyle={{ color: '#333', }}
                    countTextStyle={{ color: '#333', }}
                    start={1} min={1} max={20} onChange={(len) => counter(len)} />
                <TouchableOpacity
                    onPress={book}
                    style={styles.bookButton}>
                    <Text>BOOK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        marginTop: 50,
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
    },
});
