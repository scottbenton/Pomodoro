import React from "react";
import { FirebaseAuth } from "react-firebaseui";
import firebase from "firebase";

export const FirebaseLogin: React.FC = (props) => {
  const config = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };
  return <FirebaseAuth uiConfig={config} firebaseAuth={firebase.auth()} />;
};
