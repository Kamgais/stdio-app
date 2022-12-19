import { View, Text } from 'react-native'
import React from 'react'
import Button from '../shared/Button'

const ProfileScreen = ({navigation}) => {
  return (
    <View>
      <Button title='LOGOUT' onPress={() => navigation.navigate('Login')}/>
    </View>
  )
}

export default ProfileScreen