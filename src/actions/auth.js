import { LOGIN_SUCCESS, LOGOUT, ONLINE, OFFLINE } from "./type";
import { Db } from "../services/db";

/**
 * async redux actions to login a user
 * @param {any} user 
 * @returns {void}
 */
export const login = (user) => (dispatch) => {
  return Db.login(user.username, user.password).then(
    (response) => {
      if (response.status === "success") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: response }
        });
        Promise.resolve();
        return response;
      }
    },
    (error) => {
      const message = error.message;
      Promise.reject();
      return message;
    }
  );
};

/**
 * async redux action for a user to logout
 *  @returns {void}
 */
export const logout = () => async (dispatch) => {
  const response = await Db.logout();
  if (response.status === "success") {
    dispatch({
      type: LOGOUT,
    });
    Promise.resolve();
    return response;
  }
};

/**
 * async redux action to set a student online
 *  @returns {void}
 */
export const setOnline = () => (dispatch) => {
  dispatch({
    type: ONLINE
  })
}

/**
 * async redux action to set a student offline
 *  @returns {void}
 */
export const setOffline = () => (dispatch) => {
  dispatch({
    type: OFFLINE
  })
}