import { View, Text, StyleSheet,TextInput, ImageBackground, Alert} from 'react-native'
import React from 'react';
import Button from '../../shared/Button';
import { Db } from '../../services/db';
import { Formik } from 'formik'

const LoginScreen = ({navigation}) => {
    const image = {uri: 'https://images.unsplash.com/photo-1634621388881-cb328098136d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'}


    const saveUser = async (data) => {
        //console.log(data)
        try {
            const response = await Db.login(data.username, data.password);
            console.log(response);
            Alert.alert("Logged", response.username, [
              {
                  text: "Ok",
                  onPress: () => console.log('Ask me later')
              }
          ])
            
          } catch (error) {
          Alert.alert("Error", error.message, [
            {
                text: "Ok",
                onPress: () => console.log('Ask me later')
            }
        ])
        }
        

    }
  return (
    <ImageBackground source={image} resizeMode='cover' style={styles.image}>
    <View style={styles.container}>
    <Text style={styles.title}>STDIO</Text> 
       
        <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={(values) => {saveUser(values)}}
        >
          {(props) => (
            <View style={styles.content}>
                
                <TextInput
                style={styles.input}
                 placeholder='Username'
                 onChangeText={props.handleChange('username')}   
                 value={props.values.username}
                />

                <TextInput
                style={styles.input}
                 placeholder='Password'
                 secureTextEntry={true}
                 onChangeText={props.handleChange('password')}   
                 value={props.values.password}
                />
                <Button
                title='Login'
                onPress={() => navigation.navigate('app')}
                />
            </View>
          )}  
        </Formik>
      </View>
     
    
    </ImageBackground>
  )
}


const styles = StyleSheet.create({

    container : {
      flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
      
    },
    content: {
    justifyContent: 'center',
    alignItems: 'center'
    },
    input: {
        width: 278,
        height: 49,
        marginBottom: 40,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        color: '#656565',
        paddingLeft: 20,
        fontSize: 15
    },
    image: {
        flex:1,
        justifyContent: 'center'
    },
    title:{
        fontSize: 64,
        color: '#f1f1f1',
        fontWeight: 'bold',
        marginBottom: 50

    }
    

})

export default LoginScreen
