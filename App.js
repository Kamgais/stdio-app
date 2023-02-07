import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet} from 'react-native';
import Tabs from './src/routes/tabs';
import {Provider as StoreProvider} from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './src/store';



/**
 * a component is a reusable piece of UI 
 * that can receive and render data, and manage its own state.
 */
export default function App() {
  
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
