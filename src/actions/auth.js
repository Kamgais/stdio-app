import { LOGIN_SUCCESS, LOGOUT, ONLINE, OFFLINE } from "./type";
import { Db } from "../services/db";


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

export const setOnline = () => (dispatch) => {
  dispatch({
    type: ONLINE
  })
}

export const setOffline = () => (dispatch) => {
  dispatch({
    type: OFFLINE
  })
}