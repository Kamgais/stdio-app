import { StyleSheet, Text, View, Modal, TextInput, ActivityIndicator, Alert } from 'react-native'
import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import  Icon  from 'react-native-vector-icons/Ionicons'
import { Formik } from 'formik'
import Button from './Button'
import { Db } from '../services/db'
import ROUTES from '../routes/routes'
import * as yup from 'yup';


const courseSchema = yup.object({
   title: yup.string()
   .required()
   .min(4) ,
   desc: yup.string()
   .required()
   .min(10)
})

const AddCourseModal = ({toggle, handleToggle}) => {
    const {user} = useSelector((state) => state.auth);
    const [isLoading, setLoading] = useState(false);

    const addCourse = async(data) => {
        const toSaveData = {...data, professorName: user.username};
        try {
            setLoading(true)
           const response = await Db.postCourseForTeacher(user.id, toSaveData);
           setLoading(false);
            Alert.alert("Success", response.message, [
                {
                    text: 'OK',
                    onPress: () => {handleToggle(false);}
                }
            ])

        } catch (error) {
          Alert.alert("Error", error.message, [
            {
                text: 'OK',
                onPress: () => {console.log('....'); setLoading(false);}
            }
          ])  
        }
    }
  return (
  <Modal visible={toggle} animationType='slide'>
    <View style={styles.container}>
        <Icon name='close-circle-sharp' size={40} color='#ff7979' onPress={() => handleToggle(false)} style={styles.icon}/>
        <View style={styles.containerTitle}>
            <Text style={styles.text}>Add a Course</Text>
        </View>
        <View style={styles.addForm}>
        <Formik
        initialValues={{title: '', desc: ''}}
        validationSchema={courseSchema}
        onSubmit={(values, actions) => {addCourse(values); actions.resetForm()}}
        >
            {
             (props) => (
                <View style={styles.formContainer}>
                    <TextInput
                    style={[styles.textInput, styles.title]}
                     placeholder='Course name'
                     onChangeText={props.handleChange('title')}   
                     value={props.values.title}
                     onBlur= {props.handleBlur('title')}
                    />
                    <Text style={styles.errorText}>{props.touched.title && props.errors.title}</Text>

                    <TextInput
                    style={[styles.textInput, styles.area]}
                    placeholder='Description'
                    onChangeText={props.handleChange('desc')}
                    value={props.values.desc}
                    multiline={true}
                    numberOfLines={10}
                    onBlur= {props.handleBlur('desc')}
                    />
                    <Text style={styles.errorText}>{props.touched.desc && props.errors.desc}</Text>
                    <Button
                    title='Save'
                    onPress={props.handleSubmit}
                    />
                </View>
             )
            }

        </Formik>
        </View>
        { isLoading && <ActivityIndicator size="large" color="#ff7979" />}
    </View>
  </Modal>
  )
}

export default AddCourseModal

const styles = StyleSheet.create({
    textInput: {
       backgroundColor:'#d9d9d9',
       borderRadius: 10,
       width: 275,
       height: 50,
       marginBottom: 20,
       paddingHorizontal: 10
    },
    container : {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        marginTop: 70
    },
    title: {
    height: 50,
    },
    containerTitle: {
    marginTop: 20,
    marginBottom: 20
    },
    text: {
    fontSize: 20,
    fontWeight: 'bold',
  
    },
    formContainer: {
        alignItems: 'center'
    },
    errorText: {
        color: 'red'
    },
    area: {
        minHeight: 170
    }
})