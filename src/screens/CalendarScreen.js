import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars'
import { CalendarList } from 'react-native-calendars'
import Header from '../shared/Header'

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.calendar}>
      <Calendar/>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
 container : {
  alignItems: 'center'
 },
 calendar: {
  width: '100%',

 }
})

export default CalendarScreen