import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import ROUTES from '../routes/routes';
import StartScreen from '../screens/Auth/StartScreen';
import BottomTabNavigator from '../BottonTabs/BottomTabNavigator';

const Stack = createStackNavigator();
/**
 * A Stack Navigator is a type of navigation component
 *  in React Native and React Navigation library that 
 * allows the user to navigate between different screens 
 * or routes in a stack-like fashion. The navigation state 
 * is managed as a stack of routes, where each route represents
 *  a different screen or page in the app.
 * Here is the implementation of the stack navigation "AuthNavigator"
 * 
 */
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