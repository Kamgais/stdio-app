import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ROUTES from '../routes/routes';
import CourseDetails from '../screens/Home/CourseDetails';
import QrScannerScreen from '../screens/Home/QrScannerScreen';

const Stack = createStackNavigator();
/**
 * A Stack Navigator is a type of navigation component
 *  in React Native and React Navigation library that 
 * allows the user to navigate between different screens 
 * or routes in a stack-like fashion. The navigation state 
 * is managed as a stack of routes, where each route represents
 *  a different screen or page in the app.
 * Here is the implementation of the stack navigation "HomeNavigator"
 * 
 */
function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.HOME}>
      <Stack.Screen name={ROUTES.HOME_COURSE_LIST} component={HomeScreen} />
      <Stack.Screen name={ROUTES.HOME_COURSE_VIEW} component={CourseDetails} />
      <Stack.Screen name={ROUTES.HOME_QR_SCANN} component={QrScannerScreen} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;