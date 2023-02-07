import { LOGIN_SUCCESS, LOGOUT, ONLINE , OFFLINE } from "../actions/type";
import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * AsyncStorage is a simple, asynchronous, persistent, 
 * key-value storage system that is global to the app. 
 * It is implemented as a simple JavaScript API for React Native 
 * and works across platforms, including iOS and Android.
 */
let  user = AsyncStorage.getItem("user");

const initialState = user
  ? { isLoggedIn: true, user: user , isOnline: false}
  : { isLoggedIn: false, user: null, isOnline: false };
  
/**
 * a reducer is a pure function that takes the current state 
 * and an action as inputs, and returns the next state of the application. 
 * @param {any} state
 * @param {any} action
 * @returns {any}
 */
export default auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS: {
      const currentUser = {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      }
     return currentUser
    }

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    case ONLINE: 
     return {
      ...state,
      isOnline: true
     }

     case OFFLINE : 
      return {
        ...state,
        isOnline: false
      }
    default:
      return state;
  }
};