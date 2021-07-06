import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogInScreen from "../screens/LogInScreen";
import RegisterScreen from "../screens/RegisterScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import SplashScreen from "../screens/SplashScreen.js";
import MyBookingsScreen from "../screens/MyBookingsScreen.js";
import ProfileScreen from "../screens/ProfileScreen.js";
import UserSettings from "../screens/UserSettings.js";
import BusinessProfileScreen from "../screens/BusinessProfileScreen.js";
import BusinessSettings from "../screens/BusinessSettings.js";
import PastClasses from "../screens/PastClasses.js";
import RegisterBusinessScreen from "../screens/RegisterBusinessScreen.js";
import BizHomeScreen from "../screens/MyClasses.js";
import AddClassScreen from "../screens/AddClass.js";
import ClassDetailsScreen from '../screens/ClassDetails';
import BizClassDetails from '../screens/BizClassDetails';
import BookedClassDetails from  '../screens/BookedClassDetails';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const UserProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="PastClasses"
            component={PastClasses}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="UserSettings"
            component={UserSettings}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>
);

function HomeTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: 'black',
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="My Bookings"
                component={MyBookingsScreen}
                options={{
                    tabBarLabel: 'My Bookings',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="book" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={UserProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const BizProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="BizProfile"
            component={BusinessProfileScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="BusinessSettings"
            component={BusinessSettings}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>
);

const bizTab = createBottomTabNavigator();

function BizTabs() {
    return (
        <bizTab.Navigator
            initialRouteName="MyClasses"
            tabBarOptions={{
                activeTintColor: 'black',
            }}>
            <bizTab.Screen
                name="MyClasses"
                component={BizHomeScreen}
                options={{
                    tabBarLabel: 'My Classes',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="book" color={color} size={size} />
                    ),
                }}
            />
            <bizTab.Screen
                name="AddClass"
                component={AddClassScreen}
                options={{
                    tabBarLabel: 'Add Class',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="pluscircleo" color={color} size={size} />
                    ),
                }}
            />
            <bizTab.Screen
                name="BusinessProfile"
                component={BizProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" color={color} size={size} />
                    ),
                }}
            />
        </bizTab.Navigator>
    );
}


const Stack = createStackNavigator();
export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LogInScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="RegisterBusiness" component={RegisterBusinessScreen} />
                <Stack.Screen name="Home" component={HomeTabs} />
                <Stack.Screen name="MyClasses" component={BizTabs} />
                <Stack.Screen name="ClassDetails" component={ClassDetailsScreen} />
                <Stack.Screen name="BizClassDetails" component={BizClassDetails} />
                <Stack.Screen name="BookedClassDetails" component={BookedClassDetails} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

