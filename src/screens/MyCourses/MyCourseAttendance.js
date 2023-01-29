import { StyleSheet, Text, View, ScrollView , ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../shared/Header'
import SvgQRCode from 'react-native-qrcode-svg';
import { Db } from '../../services/db'

const MyCourseAttendance = ({route}) => {
  const [onlineUsers, setOnlineUsers] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  useEffect(() => {
    fetchCourse().then((_)=> {
      fetchOnlineUsers()
    })
   
  },[])

  const fetchOnlineUsers = async() => {
    if(route.params.online ) {
     
        setLoading(true)
        console.log(course)
        const response = await Db.getUsersByIds(course.online);
        setOnlineUsers(response)
        setLoading(false)
      }
    }

    const fetchCourse = async() => {
      console.log(route.params.id)
      const response = await Db.getCourseById(route.params.id);
      console.log(response)
      setCourse(response)

    }
  


  const onRefresh = async() => {
    setRefreshing(true);
   // setLoading(true)
   // await fetchOnlineUsers()
   fetchCourse().then((_)=> {
    fetchOnlineUsers()
  })
    setRefreshing(false)
    //setLoading(false)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center'}} refreshControl={<RefreshControl  refreshing={refreshing}  onRefresh={onRefresh}/>}>
      <Header/>
      {
        isLoading && (
                  <ActivityIndicator size="large" color="#ff7979" style={styles.loader}/>
                )
              }
      <View style={styles.title} >
        <Text style={styles.titleText}>Live Attendance</Text>
      </View>
      <View style={styles.onlineList}>
        {
          onlineUsers.map((item, index) => (
            <View style={styles.onlineSingle} key={index}>
          <Text style={styles.onlineText}>{item.username.charAt(0).toUpperCase() + item.username.slice(1)}  {item.firstname.toLowerCase()}</Text>
          <View style={styles.circle}></View>
        </View>
          ))
        }
        

      </View>

      <View style={styles.qrCode}>
       <SvgQRCode  value={route.params.id}/>
      </View>
    </ScrollView>
  )
}

export default MyCourseAttendance

const styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: 'column',
   
 },

 title: {
   marginVertical: 30
 },

 titleText: {
  fontSize:20,
  fontWeight: 'bold'
 },
 onlineList: {
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  width: '90%'
 },
 onlineSingle: {
  width: '100%',
  height: 40,
  flexDirection: 'row',
  paddingHorizontal: 20,
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
  borderRadius: 5,
  elevation: 4,
  shadowColor: '#f1f1f1',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.2,
  shadowRadius: 1,
 },
 onlineText : {
  fontSize: 15,
  fontWeight: 'bold'
 },
 circle : {
  width: 15,
  height: 15,
  borderRadius: 50,
  backgroundColor: '#32CC0B'
 }
})