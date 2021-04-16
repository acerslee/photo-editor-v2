import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import {
    FIREBASE_API_KEY,
    FIREBASE_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID
  } from './firebase_key.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  FIREBASE_API_KEY,
  authDomain: FIREBASE_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const fireAuthorization = firebase.auth();
const fireStorage = firebase.storage();
const fireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


export {
    fireAuthorization,
    fireStorage,
    fireStore,
    timestamp
};