import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import ROUTES from '../routes/routes';
import StartScreen from '../screens/Auth/StartScreen';
import BottomTabNavigator from '../BottonTabs/BottomTabNavigator';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#f1f1f1',
        headerBackTitleVisible: false,
        
       headerStyle: {
        backgroundColor: '#ff7979',
        
       }
    }} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name={ROUTES.AUTH} component={StartScreen} />
      <Stack.Screen name="app" component={BottomTabNavigator} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default AuthNavigator;