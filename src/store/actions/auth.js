import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgVIN0p3XAhfarKMTzJUTF7QcPyA-ZUvI";
    if (isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgVIN0p3XAhfarKMTzJUTF7QcPyA-ZUvI";
    }
    axios
      .post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFailed(error.response.data.error));
      });
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(()=> {
      dispatch(logout());
    }, expirationTime * 1000);
  }
};
