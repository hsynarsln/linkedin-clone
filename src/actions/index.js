import { signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db, provider, storage } from '../firebase';
import { GET_ARTICLES, SET_LOADING_STATUS, SET_USER } from './actionType';

export const setUser = payload => ({
  type: SET_USER,
  user: payload
});

export const setLoading = status => ({
  type: SET_LOADING_STATUS,
  status: status
});

export const getArticles = payload => ({
  type: GET_ARTICLES,
  payload: payload
});

//* dispatch ile setUser'a fonksiyonda elde ettiğimiz user'ı atıyoruz.
//? setUser --> type ve değer olarak reducer'a gönderiyoruz.
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

//! put image to storage && post to firestore
export const postArticleAPI = payload => {
  return dispatch => {
    //! ADD LOADING
    dispatch(setLoading(true));

    //*-------------------------
    //! image upload to storage
    //*-------------------------
    if (payload.image != '') {
      const uploadRef = ref(storage, `images/${payload.image.name}`);
      const upload = uploadBytesResumable(uploadRef, payload.image);
      upload.on(
        'state_changed',
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {
          console.log(error.code);
        },
        async () => {
          const downloadURL = await getDownloadURL(upload.snapshot.ref);
          console.log(downloadURL);
          //*------------------------
          //! post description to firestore
          //*--------------------------------
          await addDoc(collection(db, 'articles'), {
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL
            },
            video: payload.video,
            sharedImg: downloadURL,
            comments: 0,
            description: payload.description
          });

          //! LOADING
          dispatch(setLoading(false));
        }
      );
      //*-------------------------
      //! video upload to storage
      //*-------------------------
    } else if (payload.video) {
      addDoc(collection(db, 'articles'), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL
        },
        video: payload.video,
        sharedImg: '',
        comments: 0,
        description: payload.description
      });

      //! LOADING
      dispatch(setLoading(false));
    }
  };
};

//! get all articles
export function getArticlesAPI() {
  return async dispatch => {
    let payload;

    const q = await query(collection(db, 'articles'), orderBy('actor.date', 'desc'));
    onSnapshot(q, querySnapshot => {
      // console.log(querySnapshot.docs.map(doc => doc.data()));
      payload = querySnapshot.docs.map(doc => doc.data());
      // console.log(payload);
      dispatch(getArticles(payload));
    });
  };
}
