import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../shared/Button'
import Icon  from 'react-native-vector-icons/Ionicons'
import Header from '../shared/Header'
import { globalStyles } from '../../styles/global'

const ProfileScreen = ({navigation}) => {
  const {user} = useSelector((state) => state.auth)
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.content}>
      <Icon name='person-circle-sharp' size={150}/>
      <View style={globalStyles.content}>
        <Text style={globalStyles.label}>Username :</Text>
        <Text style={globalStyles.itemContent}>{user.username}</Text>
        <Text style={globalStyles.label}>Password :</Text>
        <Text style={globalStyles.itemContent}>******</Text>
      </View>
      </View>
      <Button title='LOGOUT' onPress={() => navigation.navigate('Login')}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center'
  },
  content: {
    width: '100%',
    alignItems: 'center'
  }
})

export default ProfileScreen