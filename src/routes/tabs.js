import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from '../navigations/AuthNavigator'


const Tabs = () => {
  return (
   <NavigationContainer>
    <AuthNavigator />
    </NavigationContainer>
  )
}

export default Tabs;