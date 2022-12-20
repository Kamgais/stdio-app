import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ROUTES from '../routes/routes';
import CourseDetails from '../screens/Home/CourseDetails';
import QrScannerScreen from '../screens/Home/QrScannerScreen';

const Stack = createStackNavigator();

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