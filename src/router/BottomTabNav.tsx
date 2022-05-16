import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProductScreen from '../screens/ProductScreen';
import AddressScreen from '../screens/AddressScreen';
import MenuScreen from '../screens/MenuScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './HomeStack';
import ShoppingCartStack from './ShoppingCartStack';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarInactiveTintColor: '#ffbd7d',
        tabBarActiveTintColor: '#e47911',
      }}>
      <Tab.Screen
        name="home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProductScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="user" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="shoppingCart"
        component={ShoppingCartStack}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="shopping-cart" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="more"
        component={MenuScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="menu" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
