import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, RefreshControl } from 'react-native';
import firebase from '../database/firebase';
import Card from '../components/Card.js'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FilterResults({ route, navigation }) {

    const { region, categories, minPrice, maxPrice } = route.params;
    const [classes, setClasses] = useState([])
    const [isFetching, setFetching] = useState(true)
    const [refreshing, setRefreshing] = useState(false);

    const EmptyListMessage = () => {
        console.log("empty list element")
        return (
            <View>
                <Text style={styles.emptyListText}>
                    No Classes Found.
                </Text>
            </View>
        );
    };
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
                <TouchableOpacity onPress={() => navigation.navigate("ClassDetails", { id: item.id })}>
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
            .where('categories', 'array-contains-any', categories)
            .where('region', '==', region)
            .get()
            .then((snapshot) => {
                console.log(tempClasses);
                snapshot.forEach((doc) => {
                    let data = doc.data()
                    data.id = doc.id
                    console.log(doc.data());
                    tempClasses.push(data);
                    console.log(tempClasses)

                });
                setClasses(tempClasses)
                setFetching(false)
                console.log(classes)
                console.log(isFetching)
            }
            )
    }

    useEffect(() => { getData() }, []);


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.classText}>
                Filter classes
            </Text>
            <FlatList
                data={classes}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
                extraData={classes}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={EmptyListMessage()}
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
        fontSize: 24,
        color: "black",
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
});
