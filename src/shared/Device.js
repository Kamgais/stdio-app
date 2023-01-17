import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import  Icon  from 'react-native-vector-icons/Ionicons'

const Device = (props) => {
  return (
   <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
    <View style={styles.wrapperLeft}>
    <Icon name='laptop-outline' size={40} style={styles.iconLeft}/>
    </View>
    <View style={styles.wrapperName}>
        <Text style={styles.name}>{props.name}</Text>
    </View>
    
        <Icon name='settings-sharp' size={40} style={styles.iconRight}/>
    
   </TouchableOpacity>
  )
}

export default Device

const styles = StyleSheet.create({
    wrapper: {
     flexDirection: 'row',
     paddingLeft: 20,
     paddingRight: 20,
     alignItems: 'center',
     padding: 10,
     justifyContent: 'center'
    },
    wrapperLeft: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    wrapperName: {

    },
    name: {

    },
    iconRight: {

    }
})