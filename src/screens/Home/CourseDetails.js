import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import Button from '../../shared/Button'
import Header from '../../shared/Header'

const CourseDetails = ({navigation, route}) => {
    
  return (
    <View style={styles.container}>
       <Header/>
       <View style={styles.content}>
        <Text style={styles.label}>Course :</Text>
        <Text style={styles.itemContent}>{route.params.title}</Text>
        <Text style={styles.label}>Professor's name :</Text>
        <Text style={styles.itemContent}>{route.params.professorName}</Text>
        <Text style={styles.label}>Participants :</Text>
        <Text style={styles.itemContent}>{route.params.participants}</Text>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
 container : {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
 },
 content: {
    width: '80%',
    marginTop: 50,

 },
 label: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20
 },
 itemContent: {
    fontSize: 20
 }
})

export default CourseDetails