import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ROUTES from '../routes/routes';
import MyCoursesScreen from '../screens/MyCourses/MyCoursesScreen';
import MyCourseDetails from '../screens/MyCourses/MyCourseDetails';
import MyCourseAttendance from '../screens/MyCourses/MyCourseAttendance';

const Stack = createStackNavigator();

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