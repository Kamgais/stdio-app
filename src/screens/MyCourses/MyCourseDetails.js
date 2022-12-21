import { StyleSheet, Text, View, ScrollView } from 'react-native'
import SvgQRCode from 'react-native-qrcode-svg';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { Db } from '../../services/db';
import ROUTES from '../../routes/routes';
import Header from '../../shared/Header';
import Button from '../../shared/Button';

const MyCourseDetails = ({route}) => {
    const [course, setCourse] = useState();
    const [buttonTitle, setButtonTitle] = useState('Check In');
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        (async() => {
            const response = await Db.getCourseById(route.params.id);
            setCourse(response);
        })()
    },[])
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center'}}>
       <Header/>
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
               <Button title={buttonTitle} onPress={() => navigation.navigate(ROUTES.HOME_QR_SCANN)}/>
            </View>
           </>
         )
        }

        {
         user.role === 'teacher' && (<>
           <View style={styles.button}>
               <Button title='View Attendance' onPress={() => navigation.navigate(ROUTES.MY_COURSE_ATTENDANCE)}/>
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