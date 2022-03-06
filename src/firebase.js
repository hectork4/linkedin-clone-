import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { config } from "dotenv";

console.log(process.env)

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUTCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };

  const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
  const storage = getStorage(firebaseApp);
  const db = getFirestore();
  const auth = getAuth();

  export { db, auth, storage };