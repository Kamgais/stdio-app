import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  Icon  from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={styles.containerHeader}>
    <Text style={styles.headerTitle}>STDIO</Text>
    <Icon name='add-circle-sharp' size={40} style={styles.headedrIcon} color= '#ff7979'/>
  </View>
  )
}

export default Header

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 25,
        marginBottom: 25
      },
      headerTitle: {
        fontWeight: 'bold',
        fontSize: 20
      }
})