import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import MyCoursesScreen from '../screens/MyCoursesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeNavigator from '../navigations/HomeNavigator';
import Icon  from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();
let iconName;
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
    // tabBarShowLabel: false,
     tabBarIcon: ({color, size, focused}) => {
      
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
      <Tab.Screen name="MyCourses" component={MyCoursesScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  
})

export default BottomTabNavigator;