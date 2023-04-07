// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMaHWZROjI_H0I9KRJf8fpolYTaOmF_6I",
  authDomain: "rn-instagram-c0fc4.firebaseapp.com",
  projectId: "rn-instagram-c0fc4",
  storageBucket: "rn-instagram-c0fc4.appspot.com",
  messagingSenderId: "79176943389",
  appId: "1:79176943389:web:e17959d6bd4516baeac3f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
