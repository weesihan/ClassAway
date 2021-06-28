import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, RefreshControl } from 'react-native';
import firebase from '../database/firebase';
import { set } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MyBookings(props) {
    const [classes, setClasses] = useState([])
    const [isFetching, setFetching] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const wait = timeout => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };

    const cardSelected = async (id) => {
        console.log("class pressed")
        await props.navigation.navigate("ClassDetails", { id: id })
    }

    const renderItem = ({ item }) => {
        return (
            <View alignItems="center" justifyContent="center">
                <TouchableOpacity onPress={() => props.navigation.navigate("ClassDetails", { id: item.id })}>
                    <View style={styles.item}>
                        <Text style={styles.titleText}>{item.title}</Text>
                        <Text style={styles.descText}>@ {item.admin}</Text>
                        <Text style={styles.descText}>{getDate(item.date)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
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

    const getData = () => {
        const currentUser = firebase.auth().currentUser.email
        setFetching(true)
        console.log(isFetching)
        var tempClasses = []
        firebase
            .firestore()
            .collection('Accounts')
            .doc(currentUser)
            .collection('bookedClasses')
            .get()
            .then((snapshot) => {
                console.log(tempClasses);
                snapshot.forEach((doc) => {
                    let data = doc.data()
                    console.log(doc.data());
                    tempClasses.push(data);
                    console.log(tempClasses)

                });
                setClasses(tempClasses)
                console.log("after setclass")
                setFetching(false)
                console.log(classes)
                console.log(isFetching)
            }
            )
    }


    const EmptyListMessage = () => {
        console.log("empty list element")
        return (
            <View style={styles.container}>
                <Text style={styles.descText}>
                    No Bookings Found
                </Text>
            </View>
        );
    };

    useEffect(() => { getData() }, []);


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.classText}>
                My Bookings!
            </Text>
            <FlatList
                data={classes}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
                extraData={classes}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                EmptyListMessage={EmptyListMessage}
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
    item: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        width: 275,
        height: 85,
        marginHorizontal: 4,
        marginVertical: 9,
        padding: 6,
    },
    titleText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        color: "black",
    },
    subtitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: "black",
    },
    descText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: "black",
    },
    classText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
        color: "black",
    },
});