import { LOGIN_SUCCESS, LOGOUT, ONLINE , OFFLINE } from "../actions/type";
import AsyncStorage from "@react-native-async-storage/async-storage";


let  user = AsyncStorage.getItem("user");

const initialState = user
  ? { isLoggedIn: true, user: user , isOnline: false}
  : { isLoggedIn: false, user: null, isOnline: false };
  
  
  export default auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS: {
      const currentUser = {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      }
     // AsyncStorage.setItem('user', JSON.stringify(currentUser.user))
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