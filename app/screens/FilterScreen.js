import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Modal, StyleSheet, Text, View, TextInput, FlatList, RefreshControl, Image, Pressable, SafeAreaView } from "react-native";
import firebase from '../database/firebase';
import Card from '../components/Card.js'
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { refresh } from 'react-native-app-auth';

export default function FilterScreen(props) {
    const [classes, setClasses] = useState([])
    const [isFetching, setFetching] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [region, setRegion] = useState(null)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(10000)
    const [categories, setCategories] = useState([])
    const currentDate = firebase.firestore.Timestamp.now()

    const clearState = () => {
        setRegion(null);
        setCategories([]);
        setMinPrice(0);
        setMaxPrice(100000);
        setCategoryOpen(false);
        setRegionOpen(false);
    }


    const [items, setItems] = useState([
        { label: 'Lifestyle', value: 'lifestyle' },
        { label: 'Wellness', value: 'wellness' },
        { label: 'Sport', value: 'sport' },
        { label: 'Art', value: 'art' },
        { label: 'Dance', value: 'dance' },
        { label: 'Others', value: 'others' },
    ]);
    const [regions, setRegions] = useState([
        { label: 'North', value: 'north' },
        { label: 'Northeast', value: 'northeast' },
        { label: 'East', value: 'east' },
        { label: 'West', value: 'west' },
        { label: 'Central', value: 'central' },

    ]);

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [regionOpen, setRegionOpen] = useState(false)

    const onCategoryOpen = useCallback(() => {
        setRegionOpen(false);
    }, []);

    const onRegionOpen = useCallback(() => {
        setCategoryOpen(false);
    }, []);

    /*
        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        const showDatePicker = () => {
            setDatePickerVisibility(true);
        };
    
        const hideDatePicker = () => {
            setDatePickerVisibility(false);
        };
    
        
        const handleConfirm = (date) => {
            setDate(date)
            const formatted = moment(date).format('MMMM Do YYYY, h:mm:ss a');
            setDateTimePicker(formatted);
            console.log("A date has been picked: ", date);
            hideDatePicker();
          };
        
        */

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

    const getData = () => {
        setFetching(true)
        console.log(isFetching)
        var tempClasses = []
        firebase
            .firestore()
            .collection('Classes')
            .where('date', '>=', currentDate)
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

    const getResults = () => {
        if (region === null || categories.length === 0) {
            Alert.alert(
                'Please fill in the region and categories fields to filter results!',
            )
        } else {
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
                    const dateClasses = tempClasses.filter((item) => {
                        return item.date >= currentDate
                    })
                    const priceClasses = dateClasses.filter((item) => {
                        return item.cost >= minPrice && item.cost <= maxPrice
                    })
                    setClasses(priceClasses)
                    setFetching(false)
                    console.log(dateClasses)
                    console.log(isFetching)
                    setModalVisible(!modalVisible)
                }
                )
        }
        
    }

    useEffect(() => { getData() }, []);

    return (
        <View style={styles.container}>


            <View style={styles.pageHeader}>
                <View style={{ width: "80%" }}>
                    <Text style={styles.welcomeText}>Find classes</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(true);
                        clearState()
                    }}>
                    <AntDesign
                        name="filter" color='black' size={30}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={classes}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
                extraData={classes}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={EmptyListMessage()}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <AntDesign name='close' color='black' size={25} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.selectText}>Region</Text>
                        <DropDownPicker
                            placeholder="Select a region"
                            open={regionOpen}
                            onOpen={onRegionOpen}
                            value={region}
                            items={regions}
                            setOpen={setRegionOpen}
                            setValue={setRegion}
                            setItems={setRegions}
                            placeholderStyle={{ color: "grey" }}
                            dropDownDirection='TOP'
                            selectedItemLabelStyle={styles.selectedText}
                            listItemLabelStyle={styles.pickerText}
                            onChangeValue={(value) => console.log(value)}
                            containerStyle={styles.pickerMenu}
                            placeholderStyle={styles.pickerText}
                        />

                        <Text style={styles.selectText}>Category</Text>
                        <DropDownPicker
                            multiple={true}
                            placeholder="Select a category"
                            open={categoryOpen}
                            onOpen={onCategoryOpen}
                            value={categories}
                            items={items}
                            setOpen={setCategoryOpen}
                            setValue={setCategories}
                            setItems={setItems}
                            placeholderStyle={{ color: "grey" }}
                            dropDownDirection='TOP'
                            selectedItemLabelStyle={styles.selectedText}
                            listItemLabelStyle={styles.pickerText}
                            onChangeValue={(value) => console.log(value)}
                            containerStyle={styles.pickerMenu}
                            placeholderStyle={styles.pickerText}
                        />
                        <Text style={styles.selectText}>Price</Text>
                        <View flexDirection='row'>
                            <Text styles={styles.priceText}>$</Text>
                            <TextInput
                                keyboardType='numeric'
                                style={styles.inputStyle}
                                placeholder="MIN"
                                onChangeText={(min) => setMinPrice(parseFloat(min))}
                            />
                            <Text styles={styles.priceText}>- $</Text>
                            <TextInput
                                keyboardType='numeric'
                                style={styles.inputStyle}
                                placeholder="MAX"
                                onChangeText={(max) => setMaxPrice(parseFloat(max))}
                            />
                        </View>

                        <Pressable
                            onPress={() => {
                                console.log(region)
                                console.log(categories)
                                console.log(minPrice)
                                console.log(maxPrice)
                                getResults()
                            }}
                            style={styles.buttonClose}>
                            <Text>FIND CLASSES</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    pageHeader: {
        backgroundColor: 'white',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '2%'
    },
    containerScroll: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    welcomeText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: "black",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "black",
        padding: 10,

    },
    buttonClose: {
        alignItems: "center",
        backgroundColor: "#6559ff",
        fontFamily: 'Poppins-Medium',
        padding: 10,
        borderRadius: 8,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    pickerMenu: {
        width: 300,
        marginBottom: 20,
    },
    selectedText: {
        color: '#3740FE',
        fontFamily: 'Poppins-Bold',
    },
    pickerText: {
        color: '#A6A6A6',
        fontFamily: 'Poppins-Medium',
    },
    selectText: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 8,
        margin: 10,
        width: 80,
        fontFamily: 'Poppins-Medium',
    },
    dateStyle: {
        borderColor: 'black',
        borderWidth: 1,
        borderRightWidth: 0,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 8,
        marginVertical: 10,
        width: 260,
        height: 45,
        fontFamily: 'Poppins-Medium',
        color: '#A6A6A6'
    },
    sideIcon: {
        borderWidth: 1,
        borderLeftWidth: 0,
        borderColor: 'black',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        padding: 8,
        marginVertical: 10,
        width: 40,
        height: 45,
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
