import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigator from './app/components/Navigation.js';

const fetchFont = () => {
  Font.loadAsync({
    'Poppins-Bold': require("./app/assets/fonts/Poppins-Bold.ttf"),
    'Poppins-Medium': require("./app/assets/fonts/Poppins-Medium.ttf"),
    'Poppins-Light': require("./app/assets/fonts/Poppins-Light.ttf"),
  });
}

export default function App() {
  const [fontLoaded, setfontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFont}
                onError={() => console.log('ERROR')}
                onFinish={() => {
                    setfontLoaded(true);
                }}
            />
        );
    }
    
  return <Navigator />;
}





