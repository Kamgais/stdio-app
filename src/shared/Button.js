import React from 'react';
import { Text,StyleSheet, Pressable } from 'react-native';


/**
 * a component is a reusable piece of UI 
 * that can receive and render data, and manage its own state.
 */
const Button = (props) => {
    const {onPress, title} = props;

  return (
    <Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </Pressable>
  )
}


const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 5,
      elevation: 3,
      backgroundColor: '#FF7979',
      width: 210,
     
      
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

export default Button