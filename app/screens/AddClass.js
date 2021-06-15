import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Platform, Button, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import BottomSheet from 'reanimated-bottom-sheet';
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
//import DatePicker from 'react-native-datepicker';
//import { TimePicker } from 'react-native-simple-time-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default function AddClass(props) {
    const [className, setClassName] = useState("");
    const [description, setDesc] = useState("");
    const [cost, setCost] = useState("");
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [date, setDate] = useState(new Date(1598051730000));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [chosenDate, setDatePicker] = useState("");
    const [chosenStartTime, setStartTimePicker] = useState("");

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
      setDate(date)
      console.log("A date has been picked: ", date);
      hideDatePicker();
    };
    
    const uploadImage = async () => {
        if( image == null ) {
          return null;
        }

        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

        setUploading(true);
        setTransferred(0);
    
        const response = await fetch(image)
        const blob = await response.blob()
        const storageRef = firebase.storage().ref(`photos/${filename}`);
        const task = storageRef.put(blob)
    
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
    
          setTransferred(
            Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
              100,
          );
        });
    
        try {
          await task;
    
           const url = await storageRef.getDownloadURL();
    
          setUploading(false);
          setImage(null);
    
          // Alert.alert(
          //   'Image uploaded!',
          //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
          // );
          return url;
    
        } catch (e) {
          console.log(e);
          return null;
        }
    
      };

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            let libstatus  = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (libstatus.status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            let camstatus  = await ImagePicker.requestCameraPermissionsAsync();
            if (camstatus.status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
          }
        })();
    }, []);

    const takePhotoFromCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        console.log(result);
        
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };
    
    const choosePhotoFromLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        console.log(result);
        
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };
    
      const renderInner = () => (
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Cover Photo</Text>
          </View>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={takePhotoFromCamera}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={choosePhotoFromLibrary}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => bs.current.snapTo(1)}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );

      const renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
      );

    const addClass = async () => {
        let img = await uploadImage();
    
        // if any empty fields, alert 
        console.log("addClass pressed")
        firebase.firestore().collection("Classes").doc().set({
            title: className,
            description: description,
            cost: cost,
            date: date,
            admin: firebase.auth().currentUser.email,
            //venue/author: current shop's name
            //time
            //difficulty:
            //tags:
            pic: img
        });
    }

    const bs = React.createRef();

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bs}
                snapPoints={[450, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
            />
            <Text style={styles.title}>Add a class</Text>
            <View style={{alignItems: 'center', padding: 5}}>
                <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                    <View
                        style={{
                            height: 150,
                            width: 300,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ImageBackground 
                            source={{
                            uri: image != null ? image : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F136211%2Fscreenshots%2F2008336%2Fbg-pattern-blue-sm.png&f=1&nofb=1"
                            }}
                            style={{height: 150, width: 300}}
                            imageStyle={{borderRadius: 15}}>
                            <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <AntDesign
                                name="camerao"
                                size={35}
                                color="#fff"
                                style={{
                                opacity: 0.7,
                                alignItems: 'center',
                                justifyContent: 'center',
                                }}
                            />
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.inputStyle}
                placeholder="Class Name"
                value={className}
                onChangeText={setClassName}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Description"
                value={description}
                onChangeText={setDesc}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Cost"
                value={cost}
                onChangeText={setCost}
            />
            <View>
              <Button title="Show Date Picker" onPress={showDatePicker} />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={addClass}
                >
                    <Text style={styles.buttonText}>CREATE CLASS</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff'
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#A6A6A6',
        borderRadius: 8,
        padding: 8,
        margin: 10,
        width: 300,
        fontFamily: 'Poppins-Medium',
    },
    buttonText: {
        color: 'black',
        fontFamily: 'Poppins-Medium'
    },
    title: {
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
        padding: 5
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 8,
        fontFamily: 'Poppins-Medium',
        margin: 10,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        width: '100%',
    },
    panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
        fontFamily: 'Poppins-Bold'
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2e64e5',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        color: 'white',
        fontFamily: 'Poppins-Medium',
      },

})