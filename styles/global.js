import { StyleSheet } from "react-native";

/**
 * In React Native, styles refer to the way in which visual elements of a component, 
 * such as its layout, color, and font, are defined. React Native uses JavaScript 
 * objects to style components, which allows for dynamic styling based on the component's
 *  state and props. These style objects are passed to a component as a style prop. Styles 
 * in React Native can be created using either inline styles or by creating a stylesheet and 
 * importing it into the component. The styles are applied to the component using the style prop.
 */

export const globalStyles = StyleSheet.create({
   content: {
        width: '80%',
        marginTop: 20,
        marginBottom: 20
    
     },
    label: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20
     },
     itemContent: {
        fontSize: 20
     } 
})