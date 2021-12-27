import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { SET_USER } from './actionType';

export const setUser = payload => ({
  type: SET_USER,
  user: payload
});

//! sign in
export const signInAPI = () => {
  return dispatch => {
    signInWithPopup(auth, provider)
      .then(payload => {
        // console.log(payload);
        dispatch(setUser(payload.user));
      })
      .catch(err => alert(err.message));
  };
};

//! get user
export const getUserAuth = () => {
  return dispatch => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
};

//! sign out
export const signOutAPI = () => {
  return dispatch => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
