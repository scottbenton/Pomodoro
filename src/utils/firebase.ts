import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export function init() {
  const config = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGING_ID,
    appId: process.env.REACT_APP_FB_APP_ID,
  };

  firebase.initializeApp(config);
}
