import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-6GK7R_90nUWN4e9YWRpYv0Pnzivl3LQ",
  authDomain: "anime-shop-ffc0a.firebaseapp.com",
  projectId: "anime-shop-ffc0a",
  storageBucket: "anime-shop-ffc0a.appspot.com",
  messagingSenderId: "1012960293705",
  appId: "1:1012960293705:web:32ddf92d173579fdd12098"
};
  
  let app = firebase.initializeApp(firebaseConfig)
  let db = app.firestore()
  let auth = app.auth()
  export {db, auth}
