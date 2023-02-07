import { View, Text, StyleSheet,TextInput, ImageBackground, Alert, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native'
import React, {useState} from 'react';
import { useDispatch} from 'react-redux';
import Button from '../../shared/Button';
import { Formik } from 'formik'
import { login } from '../../actions/auth';
import { IMAGE_URL } from '../../constants/constants';

/**
 * a component is a reusable piece of UI 
 * that can receive and render data, and manage its own state.
 */
const LoginScreen = ({navigation}) => {
    const image = {uri: IMAGE_URL }
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);



/**
 * 
 * @param {any} user 
 */
const onLogin = (user) => {
      setLoading(true);
      dispatch(login(user)).then((response) => {
        if(response.status === 'success') {
          setLoading(false)
          navigation.navigate('app')
        }
      })
      .catch((error) => {
        Alert.alert("Error", error, [
          {
              text: "Ok",
              onPress: () => console.log('Ask me later') 
            }]

    )})

}
  return (
   
    <ImageBackground source={image} resizeMode='cover' style={styles.image}>
    <TouchableWithoutFeedback style={styles.container} onPress={() => {Keyboard.dismiss()}}>
      <View>
    <Text style={styles.title}>STDIO</Text> 
       
        <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={(values) => onLogin(values)}
        >
          {(props) => (
            <View style={styles.content}>
                
                <TextInput
                style={styles.input}
                 placeholder='Username'
                 onChangeText={props.handleChange('username')}   
                 value={props.values.username}
                />
              {
                isLoading && (
                  <ActivityIndicator size="large" color="#ff7979" style={styles.loader}/>
                )
              }
                <TextInput
                style={styles.input}
                 placeholder='Password'
                 secureTextEntry={true}
                 onChangeText={props.handleChange('password')}   
                 value={props.values.password}
                />
                <Button
                title='Login'
                onPress={props.handleSubmit}
                />
            </View>
          )}  
        </Formik>
        </View>
      </TouchableWithoutFeedback>
     
    
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
        marginBottom: 50,
        textAlign: 'center'

    },
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 100
    }
    

})

export default LoginScreen;
