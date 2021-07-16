import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Share, TouchableOpacity, Alert, Image, ScrollView, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import firebase from '../database/firebase';
import { AirbnbRating } from 'react-native-ratings';

export default function PastClassDetails(props) {
    const [classData, setClassData] = useState(null);
    const [date, setDate] = useState(new Object());
    const [admin, setAdmin] = useState("")
    const [adminData, setAdminData] = useState(null);
    const [hasRated, setRated] = useState(false);
    const [liked, isLiked] = useState(false);
    const [visible, isVisible] = useState(false);
    const [stars, setStars] = useState(5);
    const [numRatings, setNumRatings] = useState(0);
    const [totalRating, setTotalRating] = useState(0);
    const currentUser = firebase.auth().currentUser.email;
    const id = props.route.params.id;

    const getData = async () => {
        let query1 = await firebase.firestore()
            .collection('Classes')
            .doc(id)
            .get()

        const classdata = query1.data();
        const admin = query1.data().admin;
        setAdmin(admin)
        const date = query1.data().date;
        setClassData(classdata);
        setDate(date);

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
            .collection('favourites')
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    isLiked(true)
                }
            })
        
        await firebase.firestore()
            .collection('Accounts')
            .doc(currentUser)
            .collection('bookedClasses')
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setRated(doc.data().hasRated)
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

    const starRating = (value) => {
        setStars(value)
    }

    const giveRating = async (value, id) => {
        if (hasRated) {
            Alert.alert('You have already left a review for this class!')
        } else {
            let query = await firebase.firestore()
                .collection('Accounts')
                .doc(admin)
                .get()
        const classData = query.data()
        console.log(classData)
        const newRating = classData.totalRating + value; 
        const newNumRatings = classData.numRatings + 1;
        console.log(id, newRating, newNumRatings)
        await firebase.firestore()
            .collection('Accounts')
            .doc(admin)
            .update({
                totalRating: newRating,
                numRatings: newNumRatings,
            })

        await firebase.firestore()
            .collection('Accounts')
            .doc(currentUser)
            .collection('bookedClasses')
            .doc(id)
            .update({
                hasRated: true,
            })
            .then(() => {
                console.log('Rating has been given', stars)
                isVisible(false)
            })
        }
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
                marginTop: 40
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
                        { renderElement() }
                    </View>
                    <View style={{ width: "10%", alignItems: "flex-end" }}>
                        <TouchableOpacity onPress={() => onShare()}>
                            <AntDesign
                                name="addusergroup" color="black" size={25}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{marginRight:5}}>
                        <AntDesign name='star' color='gold' size={20}/>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                isVisible(!visible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Leave a rating for this class!</Text>
                    <AirbnbRating
                        showRating={false}
                        isDisabled={false}
                        count={5}
                        size={25}
                        selectedColor='gold'
                        onFinishRating={(rating) => {
                            starRating(rating)}}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => giveRating(stars, id)}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => isVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.bookButton}
                    onPress={() => isVisible(true)}
                >
                    <Text style={styles.buttonText}>Leave a rating!</Text>
                </TouchableOpacity>
            </View>
            
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
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalText: {
        textAlign: "center",
        marginBottom: 10,
        fontFamily: 'Poppins-Medium',
    },
    buttonText: {
        color: "white",
        fontFamily: 'Poppins-Medium',
        fontSize: 15
    },
    button: {
        borderRadius: 30,
        padding: 10,
        marginTop: 10,
        margin: 3
    },
    buttonClose: {
        backgroundColor: "#6995FF",
      },
});
