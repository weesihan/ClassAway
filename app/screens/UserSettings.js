import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Platform, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import BottomSheet from 'reanimated-bottom-sheet';
import firebase from '../database/firebase';
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function UserSettings(props) {

  const [profilePhoto, setProfilePhoto] = useState(firebase.auth().currentUser.photoURL);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const [region, setRegion] = useState([])
  const [items, setItems] = useState([
    { label: 'East', value: 'east' },
    { label: 'West', value: 'west' },
    { label: 'North', value: 'north' },
    { label: 'Northeast', value: 'northeast' },
    { label: 'Central', value: 'central' },
    { label: 'Others', value: 'others' },
  ]);
  const [open, setOpen] = useState(false);
  const bs = React.createRef();
  const email = firebase
    .auth()
    .currentUser
    .email;

  const getUser = async() => {
    const currentUser = await firebase.firestore()
    .collection('Accounts')
    .doc(email)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        console.log(profilePhoto)
        setUserData(documentSnapshot.data());
        setRegion(documentSnapshot.data().region)
      }
    })
  }

  const uploadImage = async () => {
    if (profilePhoto == null) {
      return null;
    }

    const uploadUri = profilePhoto;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

    setUploading(true);
    setTransferred(0);

    const response = await fetch(profilePhoto)
    const blob = await response.blob()
    const storageRef = firebase.storage().ref(`profilephotos/${filename}`);
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
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }

  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        let libstatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libstatus.status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
        let camstatus = await ImagePicker.requestCameraPermissionsAsync();
        if (camstatus.status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    getUser()
    })();
  }, []);

  const takePhotoFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setProfilePhoto(result.uri);
    }
  };

  const choosePhotoFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setProfilePhoto(result.uri);
    }
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Profile Photo</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          takePhotoFromCamera()
          bs.current.snapTo(1)}}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          choosePhotoFromLibrary()
          bs.current.snapTo(1)}}>
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

  const handleUpdate = async() => {
    let imgUrl = await uploadImage();

    if( imgUrl == null && profilePhoto ) {
      imgUrl = profilePhoto;
    }

    const user = firebase.auth()
        .currentUser
    
    user.updateProfile({photoURL: imgUrl})
    user.updateProfile({displayName: userData.name})
    console.log(user.displayName)

    firebase
    .firestore()
    .collection('Accounts')
    .doc(email)
    .update({
      name: userData.name,
      region: region,
    })
    .then(() => {
      console.log('User Updated!', userData);
      Alert.alert(
        'Profile Updated!',
        'Your profile has been updated successfully.'
      );
      props.navigation.navigate('Profile')
    })
  }

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[450, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
      />
      <View style={{
          flexDirection: "row",
          width: "93%",
          marginTop: 5
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
      <Text style={styles.title}>Edit Profile</Text>
      <View style={{ alignItems: 'center', padding: 5 }}>
        <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={{
                uri: profilePhoto
              }}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}>
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
      <View alignItems="center" justifyContent="center">
        <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            value={userData ? userData.name : ''}
            onChangeText={(txt) => setUserData({...userData, name: txt})}
            />
      </View>
        <View alignItems="center">
            <DropDownPicker
                min={1}
                placeholder="Select a region"
                open={open}
                value={region}
                items={items}
                setOpen={setOpen}
                setValue={setRegion}
                setItems={setItems}
                placeholderStyle={{ color: "grey" }}
                dropDownDirection='TOP'
                selectedItemLabelStyle={styles.selectedText}
                listItemLabelStyle={styles.pickerText}
                onChangeValue={(value) => setUserData({...userData, region: value})}
                containerStyle={styles.pickerMenu}
                placeholderStyle={styles.pickerText}
            />
        </View>
      
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleUpdate()
            }}
        >
          <Text style={styles.buttonText}>Update Profile</Text>
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
    containerRow: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
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
      borderColor: 'black',
      borderRadius: 8,
      padding: 8,
      margin: 10,
      width: 300,
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
      shadowOffset: { width: -1, height: -3 },
      shadowRadius: 1,
      shadowOpacity: 0.2,
      paddingTop: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden',
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      width: '100%',
      paddingBottom: 40
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
    },
    panelTitle: {
      fontSize: 20,
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
    pickerMenu: {
      width: 300,
      margin: 10,
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
    },
  })