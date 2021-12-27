import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCPvvq_w9GjF5mQBiNcuK0HmuYd3RPSGLA',
  authDomain: 'linkedin-clone-14bf8.firebaseapp.com',
  projectId: 'linkedin-clone-14bf8',
  storageBucket: 'linkedin-clone-14bf8.appspot.com',
  messagingSenderId: '252446701925',
  appId: '1:252446701925:web:e65b9619dd74147504898c'
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth(firebaseApp);

export const provider = new GoogleAuthProvider();

export const storage = getStorage(firebaseApp);
