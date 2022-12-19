import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomeNavigator from '../navigations/HomeNavigator'
import AuthNavigator from '../navigations/AuthNavigator'


const Tabs = () => {
  return (
   <NavigationContainer>
    <AuthNavigator />
    
   </NavigationContainer>
  )
}

export default Tabs;