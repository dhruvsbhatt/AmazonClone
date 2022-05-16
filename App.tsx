/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {
  View,
  StatusBar,
  useColorScheme,
} from 'react-native';

import { StripeProvider } from '@stripe/stripe-react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Router from './src/router';

import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StripeProvider publishableKey='pk_test_51HhxcyJul1JPjfN4pKpxkChLnTNG1E86IZ4FHZgjTnda1CZUJLFLHQY0NYgECWQky76cEATsRHqqRQ7kHMAV08EA00S7HcyVSY'>
        <Router />
      </StripeProvider>
    </View>
  );
};

export default withAuthenticator(App);
