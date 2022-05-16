import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNav from "./BottomTabNav";

const Root = createNativeStackNavigator();

const Router = () => {
    return(
        <NavigationContainer>
            <Root.Navigator screenOptions={{ headerShown: false }}>
                <Root.Screen name="HomeTabs" component={BottomTabNav} />
            </Root.Navigator>
        </NavigationContainer>
    )
}

export default Router;