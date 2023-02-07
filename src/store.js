import { configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";

/**
 * In Redux, a store is a container for the state of your application. 
 * It holds the current state of your application and provides methods 
 * for updating the state, such as dispatching actions. The store is created 
 * using the createStore function from the Redux library and it is the single
 *  source of truth for the entire state of your application.
 */
const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store;