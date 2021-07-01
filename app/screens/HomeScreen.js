import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, RefreshControl } from 'react-native';
import firebase from '../database/firebase';
import Card from '../components/Card.js'
import { set } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';


export default function HomeScreen(props) {

    const [classes, setClasses] = useState([])
    const [favourites, setFavourites] = useState([])
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
                <TouchableOpacity onPress={() => props.navigation.navigate("ClassDetails", { id: item.id })}>
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

    const getData = async () => {
        const currentUser = firebase.auth().currentUser.email
        setFetching(true)
        console.log(isFetching)
        var faveClasses = []
        var nearbyClasses = []

        await firebase
            .firestore()
            .collection('Accounts').doc(currentUser)
            .collection('favourites')
            .get()
            .then((snapshot) => {
                console.log(faveClasses);
                snapshot.forEach((doc) => {
                    let data = doc.data()
                    data.id = doc.id
                    console.log(doc.data());
                    faveClasses.push(data);
                    console.log(faveClasses)

                });
                setFavourites(faveClasses)
                console.log(classes)
            }
            )

        await firebase
            .firestore()
            .collection('Classes')
            .get()
            .then((snapshot) => {
                console.log(nearbyClasses);
                snapshot.forEach((doc) => {
                    let data = doc.data()
                    data.id = doc.id
                    console.log(doc.data());
                    nearbyClasses.push(data);
                    console.log(nearbyClasses)

                });
                setClasses(nearbyClasses)
                setFetching(false)
                console.log(classes)
                console.log(isFetching)
            }
            )
    }

    useEffect(() => { getData() }, []);

    const EmptyListMessage = () => {
        console.log("empty list element")
        return (
            <View>
                <Text style={styles.emptyListText}>
                    No Classes Found. Pull down to refresh.
                </Text>
            </View>
        );
    };

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Text style={styles.welcomeText}>
                Welcome back {firebase.auth().currentUser.displayName}!
            </Text>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.container}>
            <Text style={styles.classText}>
                Near You
            </Text>
            <FlatList
                data={classes}
                renderItem={renderItem}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
                extraData={classes}
                keyExtractor={(item) => item.title}
                ListEmptyComponent={EmptyListMessage()}
            />
            <Text style={styles.classText}>
                My Favourites
            </Text>
            <FlatList
                data={favourites}
                renderItem={renderItem}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
                extraData={favourites}
                keyExtractor={(item) => item.title}
                ListEmptyComponent={EmptyListMessage()}
            />
        </View>
        </ScrollView>
    </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: 10
    },
    containerScroll: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    welcomeText: {
        marginTop: '10%',
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: "black",
        margin: 5,
        marginHorizontal: 15
    },
    classText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: "#6559ff",
        margin: 5,
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
    image: {
        width: 300,
        height: 150,
    },
    emptyListText: {
        fontFamily: 'Poppins-Medium',
        marginTop: 10,
        fontSize: 15,
        textAlign: 'center'
    }
});

