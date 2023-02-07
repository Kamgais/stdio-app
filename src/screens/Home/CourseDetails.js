import { View, Text , StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../../shared/Button'
import Header from '../../shared/Header'
import ROUTES from '../../routes/routes'

/**
 * a component is a reusable piece of UI 
 * that can receive and render data, and manage its own state.
 */
const CourseDetails = ({navigation, route}) => {
    const {user} = useSelector((state) => state.auth)
  return (
   <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center'}}>
       <Header/>
       <View style={styles.content}>
        <Text style={styles.label}>Course :</Text>
        <Text style={styles.itemContent}>{route.params.title}</Text>
        <Text style={styles.label}>Professor's name :</Text>
        <Text style={styles.itemContent}>{route.params.professorName}</Text>
    

        {
         user.role === 'student' && (<>
            <Text style={styles.label} >Description</Text>
            <Text style={styles.itemContent}>{route.params.desc}</Text>
            <View style={styles.button}>
               <Button title='Participate' onPress={() => navigation.navigate(ROUTES.HOME_QR_SCANN, {...route.params, type: 'REGISTER'})}/>
            </View>
            </>
         )
        }
       </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
 container : {
    flex: 1,
    flexDirection: 'column',
   
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
 },
 button : {
   width: '100%',
   marginTop: 30,
   alignItems: 'center'
 }
})

export default CourseDetails