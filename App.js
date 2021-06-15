import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigator from './app/components/Navigation.js';

/* const fetchFont = async () => {
  await Font.loadAsync({
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
*/

export default class App extends React.Component {

  state = {
      assetsLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Poppins-Bold': require("./app/assets/fonts/Poppins-Bold.ttf"),
      'Poppins-Medium': require("./app/assets/fonts/Poppins-Medium.ttf"),
      'Poppins-Light': require("./app/assets/fonts/Poppins-Light.ttf"),
    });

      this.setState({ assetsLoaded: true });
  }

  render() {

      const {assetsLoaded} = this.state;

      if( assetsLoaded ) {
          return (
              <Navigator />
          )
      }
      else {
          return (
              <AppLoading>
              </AppLoading>
          );
      }
  }
}





