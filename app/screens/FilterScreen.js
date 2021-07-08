import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Alert, Modal, StyleSheet, Text, View, TextInput } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
//import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FilterScreen(props) {
    //const [searchQuery, setSearchQuery] = useState('');
    //const [searchResults, setSearchResults] = useState([])
    //const onChangeSearch = query => setSearchQuery(query);
    /*
   const getSearchResults = () => {
       var resutls = []
       firebase
           .firestore()
           .collection('Classes').where('title', '==', searchQuery)
           .get()
           .then((snapshot) => {
               console.log(results);
               snapshot.forEach((doc) => {
                   let data = doc.data()
                   data.id = doc.id
                   console.log(doc.data());
                   results.push(data);
                   console.log(results)

               });
               setSearchResults(results)
               console.log(resutls)
           }
           )
   }
   */
    /*
    <Searchbar
                placeholder="Search classes"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
    */

    const [modalVisible, setModalVisible] = useState(false);
    const [region, setRegion] = useState(null)
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    //const [startDate, setStartDate] = useState("")
    //const [endDate, setEndDate] = useState("")
    //const [displayedDate, setDisplay] = useState("Select a date")
    //const [time, setTime] = useState("")
    const [categories, setCategories] = useState([])
    //const [difficulty, setDifficulty] = useState("")
    //const [date, setDate] = useState("")
    //const [startDatePicker, setStartDatePicker] = useState("Select date");
    //const [endDatePicker, setEndDatePicker] = useState("Select date");

    const clearState = () => {
        setRegion("");
        setCategories([]);
        setMinPrice("");
        setMaxPrice("");
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
        { label: 'South', value: 'south' },
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

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Find classes</Text>
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
                        <Text style={styles.selectText}>Date</Text>

                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                console.log(region)
                                console.log(categories)
                                console.log(minPrice)
                                console.log(maxPrice)
                                props.navigation.navigate("SearchResults", {
                                    region: region,
                                    categories: categories,
                                    minPrice: minPrice,
                                    maxPrice: maxPrice
                                })
                                clearState()
                            }}
                            style={styles.buttonClose}>
                            <Text>FIND CLASSES</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.buttonOpen}>
                <Text>Filter</Text>
            </TouchableOpacity>
        </View>
    )
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
    welcomeText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: "black",
        margin: 5,
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
        alignItems: "center",
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
});
