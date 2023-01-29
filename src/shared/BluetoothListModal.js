// import React, {useState, useEffect} from 'react'
// import { StyleSheet, Text, View, FlatList, Modal } from 'react-native'
// import BluetoothSerial from 'react-native-bluetooth-serial-next'
// import Device from './Device'
// import Header from './Header';



// const BluetoothListModal = ({opened, setOpened}) => {
// const [list, setList] = useState([]);
// const [bolEnable, setBolEnable] = useState(false);
// const renderItem = ({item}) => {
//     return <Device {...item}/>
// }

// const init = async() => {
//     const enable = await BluetoothSerial.requestEnable();
//     const bList = await BluetoothSerial.list();
//     setList(bList);
//     console.log(list)
// }

// const remove = async() => {
//     await BluetoothSerial.stopScanning();
//     console.log('connection terminated...')
// }


// useEffect(() => {
//     init();
//     return remove
// },[])
// return (
// <Modal>
// <View>
//     <Header/>
//     <FlatList
//     data={list}
//     renderItem={renderItem}
//     />
// </View>
// </Modal>
// )
// }

// export default BluetoothListModal

// const styles = StyleSheet.create({})