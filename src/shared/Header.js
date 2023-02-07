import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import  Icon  from 'react-native-vector-icons/Ionicons';
import AddCourseModal from './AddCourseModal';
import { useAuth } from '../hooks/useAuth';


/**
 * a component is a reusable piece of UI 
 * that can receive and render data, and manage its own state.
 */
const Header = () => {
  const {user} = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    <View style={styles.containerHeader}>
    <Text style={styles.headerTitle}>STDIO</Text>
    {user.role === 'teacher' && <Icon name='add-circle-sharp' size={40} style={styles.headedrIcon} color= '#ff7979' onPress={() => setModalOpen(true)}/>}
    
  </View>
  <AddCourseModal toggle={modalOpen} handleToggle={setModalOpen}/>
  </>
  )
}

export default Header

const styles = StyleSheet.create({
    containerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 25,
        marginBottom: 25
      },
      headerTitle: {
        fontWeight: 'bold',
        fontSize: 20
      }
})