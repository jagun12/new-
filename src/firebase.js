import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage , } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQ1j2rFp9GVWzxrLRz1YTJfZQ4QpoV-x8",

  authDomain: "cynohub-v3.firebaseapp.com",

  databaseURL: "https://cynohub-v3.firebaseio.com",

  projectId: "cynohub-v3",

  storageBucket: "cynohub-v3.appspot.com",

  messagingSenderId: "400285444094",

  appId: "1:400285444094:web:0827fb49782bac59"

   
  // apiKey: "AIzaSyD843BP3WfghGr68g-fxH9Ja_LJhsOgHvU",
  // authDomain: "newdata-cad7e.firebaseapp.com",
  // projectId: "newdata-cad7e",
  // storageBucket: "newdata-cad7e.appspot.com",
  // messagingSenderId: "161432441410",
  // appId: "1:161432441410:web:b60b3c83f5c9dc9c18d3db",
  // measurementId: "G-LX70HE089E"

};
// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app);

const auth = getAuth();
export {db ,auth , storage , }