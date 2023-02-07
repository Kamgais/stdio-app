import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ROUTES from '../routes/routes';
import MyCoursesScreen from '../screens/MyCourses/MyCoursesScreen';
import MyCourseDetails from '../screens/MyCourses/MyCourseDetails';
import MyCourseAttendance from '../screens/MyCourses/MyCourseAttendance';

const Stack = createStackNavigator();
/**
 * A Stack Navigator is a type of navigation component
 *  in React Native and React Navigation library that 
 * allows the user to navigate between different screens 
 * or routes in a stack-like fashion. The navigation state 
 * is managed as a stack of routes, where each route represents
 *  a different screen or page in the app.
 * Here is the implementation of the stack navigation "MyCoursesNavigator"
 * 
 */
function MyCoursesNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={ROUTES.MY_COURSE_LIST}>
      <Stack.Screen name={ROUTES.MY_COURSE_LIST} component={MyCoursesScreen} />
      <Stack.Screen name={ROUTES.MY_COURSE_VIEW} component={MyCourseDetails} />
      <Stack.Screen name={ROUTES.MY_COURSE_ATTENDANCE} component={MyCourseAttendance} />
    </Stack.Navigator>
  );
}

export default MyCoursesNavigator;