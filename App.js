import React , {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {db} from './firebaseConfig';
import { getDocs, query, collection, where } from 'firebase/firestore';
import LoginScreen from './src/screens/LoginScreen';



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
   <LoginScreen/>
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
