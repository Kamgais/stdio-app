import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react'
import Button from '../../shared/Button'
import { Db } from '../../services/db';
import Header from '../../shared/Header';
import ROUTES from '../../routes/routes';





const HomeScreen = ({navigation}) => {
  const [courses, setCourses] = useState();

  const fetchCourses = async() => {
    try {
      const response = await Db.getAllCourses();
      console.log(response)
      setCourses(response)
    } catch (error) {
      console.log(error);
    }
   

  }

  useEffect(() => {
    fetchCourses();
  },[])
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center'}}>
      <Header/>

      <View style= {styles.containerList}>
        <View style={styles.containerListHeader}>
          <Text style= {styles.containerListTitle}>Courses Available</Text>
        </View>
    <View style={styles.courseList} >
     
     {
      courses?.map((course) => (
        
        <TouchableOpacity key={course.id} style={styles.courseItem} onPress={() => navigation.navigate(ROUTES.HOME_COURSE_VIEW,course)}>
          <Text style={styles.text}>{course.title}</Text>
        </TouchableOpacity>
        
      ))
     }
     
    </View>
    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: 'column',
   
  },
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
  },
  containerList:{
    marginTop: 50,
    width: '90%'
  },
  containerListHeader:{
    marginBottom: 50,
    alignItems: 'center'
  },
  containerListTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  courseList: {
    alignItems: 'center'
  },
  courseItem: {
    width: '90%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#f1f1f1',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  text: {
    color: '#7a7a7a',
    fontWeight: '500'
  }

})

export default HomeScreen