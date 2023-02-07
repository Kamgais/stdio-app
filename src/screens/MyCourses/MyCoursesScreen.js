import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl} from 'react-native'
import React, {useEffect, useState} from 'react'
import { Db } from '../../services/db';
import Header from '../../shared/Header';
import ROUTES from '../../routes/routes';
import { useAuth } from '../../hooks/useAuth';

/**
 * a component is a reusable piece of UI 
 * that can receive and render data, and manage its own state.
 */
const MyCoursesScreen = ({navigation}) => {
  const {user} = useAuth();
  const [student, setStudent] = useState();
  const [teacher, setTeacher] = useState();
  const [refreshing, setRefreshing] = useState(false)


/**
 * async function to fetch the current student or teacher
 */
const fetchPerson = async () => {

  if(user.role === 'student') {
    const response = await Db.getStudentByUserId(user.id);
    setStudent(response)
  } else {
    const response = await Db.getTeacherByUserId(user.id);
    setTeacher(response);
  }

}
  useEffect(() => {
    fetchPerson()
  },[])

  /**
  * async function for refreshing the screen
  */
  const onRefresh = async() => {
    setRefreshing(true);
    await fetchPerson();
    setRefreshing(false)
  }
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
      <Header/>
      <View style={styles.containerList}>
        <View style={styles.courseList}>
      { user.role === 'student' &&
        student?.courses.map((course) => (
          <TouchableOpacity  key={course.id} style={styles.courseItem} onPress = {() => navigation.navigate(ROUTES.MY_COURSE_VIEW, {id: course.id})}>
          <Text style={styles.text}>{course.title}</Text>
          </TouchableOpacity>
        ))
      }
       { user.role === 'teacher' &&
        teacher?.courses.map((course) => (
          <TouchableOpacity  key={course.id} style={styles.courseItem} onPress = {() => navigation.navigate(ROUTES.MY_COURSE_VIEW, {id: course.id})}>
          <Text style={styles.text}>{course.title}</Text>
          </TouchableOpacity>
        ))
      }
      </View>
      </View>
    </ScrollView>
  )
}


// Styling the component 
const styles = StyleSheet.create({
  containerList:{
    marginTop: 50,
    width: '90%'
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

export default MyCoursesScreen