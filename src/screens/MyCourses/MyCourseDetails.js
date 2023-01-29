import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import SvgQRCode from 'react-native-qrcode-svg';
import React, {useEffect, useState} from 'react'
import { Db } from '../../services/db';
import ROUTES from '../../routes/routes';
import Header from '../../shared/Header';
import Button from '../../shared/Button';
import BluetoothListModal from '../../shared/BluetoothListModal';
import AddCourseModal from '../../shared/AddCourseModal';
import { setOnline, setOffline } from '../../actions/auth';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';

const MyCourseDetails = ({route, navigation}) => {
    const [course, setCourse] = useState({});
    const [buttonTitle, setButtonTitle] = useState('Check In');
    const {user, isOnline} = useAuth();
    const dispatch = useDispatch()
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        (async() => {
         console.log(route.params)
            const response = await Db.getCourseById(route.params.id);
            setCourse(response);
            console.log(response)
        })()
    },[])


    const checkIn = async (id) => {
     try {
      const studentResponse = await Db.getStudentByUserId(user.id)
      // const response = await Db.setStudentOnline(id, studentResponse.id)
       setButtonTitle('Check Out')
       dispatch(setOnline())
       navigation.navigate(ROUTES.HOME_QR_SCANN, {...route.params, studentId: studentResponse.id, type: 'CHECK IN'})
    
      
       
     } catch (error) {
      // console.log(error)
      Alert.alert('Error', error.message, [
         {
            text: 'TRY AGAIN',
            onPress: () => checkIn(course.id)
         }
      ])
     } 
    }

    const checkOut = async (id) => {
      try {
      const response = await Db.setStudentOffline(id, user.id)
      Alert.alert('Success', response.message, [
         {
            text: 'OK',
            onPress: () => {}
         }
      ])
      setButtonTitle('Check In')
      dispatch(setOffline())
      } catch (error) {
         console.log(error)
      }
      

    }
      return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center'}}>
       <Header/>
       { opened && <AddCourseModal opened={opened} setOpened={setOpened}/>}
       <View style={styles.content}>
        <Text style={styles.label}>Course :</Text>
        <Text style={styles.itemContent}>{course?.title}</Text>
        <Text style={styles.label}>Professor's name :</Text>
        <Text style={styles.itemContent}>{course?.professorName}</Text>
        <Text style={styles.label} >Description</Text>
        <Text style={styles.itemContent}>{course?.desc}</Text>

        {
         user.role === 'student' && (<>
           <View style={styles.button}>
               { buttonTitle === 'Check In' && !isOnline ? <Button title={buttonTitle} onPress={() => checkIn(course.id)}/> 
               : <Button title={buttonTitle} onPress={() => checkOut(course.id)}/>}
               
            </View>
           </>
         )
        }

        {
         user.role === 'teacher' && (<>
           <View style={styles.button}>
               <Button title='View Attendance' onPress={() => navigation.navigate(ROUTES.MY_COURSE_ATTENDANCE, course)}/>
               <View style={styles.qrCode}>
               <SvgQRCode value={`${route.params.id}`} />
               </View>
            </View>
           </>
         )
        }
       </View>
    </ScrollView>
  )
}

export default MyCourseDetails

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
     },
     qrCode : {
        marginTop: 40,
        marginBottom: 10
     }
})