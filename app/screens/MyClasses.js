import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, RefreshControl } from 'react-native';
import firebase from '../database/firebase';
import Card from '../components/Card.js'
import { set } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MyClasses(props) {
    const currentDate = firebase.firestore.Timestamp.now()
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

    const renderItem = ({ item }) => {
        return (
            <View alignItems="center" justifyContent="center">
                <TouchableOpacity onPress={() => props.navigation.navigate("BizClassDetails", { id: item.id })}>
                    <Card>
                        <Image style={styles.cardImg} source={{ uri: item.pic }} />
                        <View style={styles.cardContent}>
                            <Text style={styles.titleText}>{item.title}</Text>
                            <Text numberOfLines={4} ellipsizeMode={'tail'} style={styles.descText}>{item.description}</Text>
                        </View>
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }

    const getData = () => {
        setFetching(true)
        console.log(isFetching)
        var tempClasses = []
        firebase
            .firestore()
            .collection('Classes')
            .where("admin", "==", firebase.auth().currentUser.email)
            .get()
            .then((snapshot) => {
                console.log(tempClasses);
                snapshot.forEach((doc) => {
                    let data = doc.data()
                    data.id = doc.id
                    if (data.date > currentDate) {
                        console.log(doc.data());
                        tempClasses.push(data);
                        console.log(tempClasses)
                    }
                });
                setClasses(tempClasses)
                setFetching(false)
                console.log(classes)
                console.log(isFetching)
            }
            )
    }

    const EmptyListMessage = () => {
        console.log("empty list element")
        return (
            <View style={{ flex:1 }}>
                <Text style={styles.emptyListText}>
                    No Classes Found
                </Text>
            </View>
        );
    };

    useEffect(() => { getData() }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.classText}>
                My classes
            </Text>
            <FlatList
                data={classes}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
                extraData={classes}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={EmptyListMessage()}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
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
    emptyListText: {
        textAlign: 'center',
        margin: '30%',
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
    }
});
