import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeNavigator from '../navigations/HomeNavigator';
import MyCoursesNavigator from '../navigations/MyCoursesNavigator';
import Icon  from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

let iconName;

/**
 * A Bottom Tab Navigator is a type of navigation 
 * component in React Native and React Navigation library 
 * that allows the user to switch between different screens 
 * or routes in an app. The navigation tabs are displayed at 
 * the bottom of the screen and provide a convenient way to access 
 * different parts of the app.
 * Here is the implementation of the bottom Tab System of the app
 */
function  BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={ ({route}) =>({
      headerTitleAlign: 'center',
      headerTintColor: '#f1f1f1',
      headerBackTitleVisible: false,
      
     headerStyle: {
      backgroundColor: '#ff7979',
      
     },
    
      tabBarActiveTintColor: '#ff7979',
      tabBarIcon: ({color, focused}) => {
      
      switch(route.name) {
        case 'Home' : iconName = focused? 'home-sharp' : 'home-outline'; break;
        case 'MyCourses' : iconName = focused? 'book-sharp': 'book-outline'; break;
        case 'Calendar' : iconName = focused? 'calendar-sharp': 'calendar-outline'; break;
        case 'Profile' : iconName = focused? 'person-sharp': 'person-outline'; break;
        default: iconName =  focused? 'home-sharp' : 'home-outline';
      }
      return <Icon name={iconName} size={22} color={color}/>
     }
  })}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="MyCourses" component={MyCoursesNavigator} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  
})

export default BottomTabNavigator;