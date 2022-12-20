import React , {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Keyboard } from 'react-native';
import {db} from './firebaseConfig';
import { getDocs, query, collection, where } from 'firebase/firestore';
import LoginScreen from './src/screens/Auth/LoginScreen';
import Tabs from './src/routes/tabs';
import {Provider as StoreProvider} from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './src/store';



export default function App() {
  const [users,setUsers] = useState([]);
  const getUser = async () => {
    let newUsers = [];
    try {
      const q = query(collection(db, "users"))
      const userDocument = await getDocs(q);
      userDocument.forEach((doc) => {
        newUsers.push({...doc.data(), id: doc.id})
      })
     

      setUsers(newUsers);
      
    } catch (error) {
      console.log(error)
    }
   
  }

  useEffect(() => {
    getUser().then(() => {})
  },[])
  return (
    
    <StoreProvider store = {store}>
    <SafeAreaProvider style={{flex: 1}}>
       <Tabs/>
    </SafeAreaProvider>
    </StoreProvider>
    
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
