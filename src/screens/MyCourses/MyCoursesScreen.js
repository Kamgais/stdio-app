import { View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Db } from '../../services/db';
import Header from '../../shared/Header';
import ROUTES from '../../routes/routes';

const MyCoursesScreen = ({navigation}) => {
  const {user} = useSelector((state) => state.auth);
  const [student, setStudent] = useState();
  const [teacher, setTeacher] = useState();


  useEffect(() => {
    (async() => {
      if(user.role === 'student') {
        const response = await Db.getStudentByUserId(user.id);
        console.log(response.courses)
      
        setStudent(response)
      } else {
        const response = await Db.getTeacherByUserId(user.id);
        setTeacher(response);
      }
      
    })()
  },[])
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center'}}>
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