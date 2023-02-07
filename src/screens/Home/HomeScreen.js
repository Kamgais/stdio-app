import { View, Text, TouchableOpacity, ScrollView, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Db } from '../../services/db';
import Header from '../../shared/Header';
import ROUTES from '../../routes/routes';


/**
 * a component is a reusable piece of UI 
 * that can receive and render data, and manage its own state.
 */
const HomeScreen = ({navigation}) => {
  const [courses, setCourses] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);

  /**
   * call the Db method getAllCourses and set the current state 
   */
  const fetchCourses = async() => {
    try {
      const response = await Db.getAllCourses();
      console.log(response)
      setCourses(response)
    } catch (error) {
      console.log(error);
    }
   

  }

 /**
  * async function for refreshing the screen
  */
 const onRefresh = async() => {
    setRefreshing(true);
    setLoading(true)
    await fetchCourses()
    setRefreshing(false)
    setLoading(false)
  }

  useEffect(() => {
    fetchCourses();
  },[])
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center'}}  refreshControl={<RefreshControl  refreshing={refreshing}  onRefresh={onRefresh}/>}>
      <Header/>
            {
                isLoading && (
                  <ActivityIndicator size="large" color="#ff7979" style={styles.loader}/>
                )
              }
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

// styling the component 
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