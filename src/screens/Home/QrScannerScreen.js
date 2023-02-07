import { Alert, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, {useEffect, useState}from 'react'
import { useSelector } from 'react-redux';
import Button from '../../shared/Button';
import { Db } from '../../services/db';
import ROUTES from '../../routes/routes';



/**
 * a component is a reusable piece of UI 
 * that can receive and render data, and manage its own state.
 */
const QrScannerScreen = ({route, navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isLoading, setLoading] = useState(false)
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        (async() => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    },[])

    const handleBarCodeScanned = async ({type, data}) => {
      let response;
        setScanned(true);
        

        if(route.params.id === data) {
          try {
            setLoading(true);
            if(route.params.type === 'REGISTER') {
             response  = await Db.postCourseForStudent(user.id, route.params);
            } 

            if(route.params.type === 'CHECK IN') {
               response = await Db.setStudentOnline(route.params.id, route.params.studentId)
            }
            
            setLoading(false)
            Alert.alert("Success", response.message, [
              {
                text: 'OK',
                onPress: () => {
                  if(route.params.type === 'CHECK IN') {
                    navigation.goBack()
                  } else {
                    navigation.navigate(ROUTES.MY_COURSE_VIEW)
                  }
                 
                }
              }
            ])
          } catch (error) {
            setLoading(false);
            Alert.alert("Error", error.message, [
              {
                text: 'OK',
                
              }
            ])
          }
        } else {
          alert('not good qr code for this action')
        }
         
          
      
       
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
  return (
   
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && 
          <View style={styles.button}>
          { isLoading && <ActivityIndicator size="large" color="#ff7979" />}
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
          </View>
          }
        </View>
      
  )
}

export default QrScannerScreen

// styling the component 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      },
      button: {
        width: '100%',
        alignItems: 'center'
      }     
})