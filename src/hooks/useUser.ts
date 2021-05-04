import { useState, useEffect } from "react";
import firebase from "firebase";

export function useUser() {
  const [user, setUser] = useState<firebase.User | undefined>(
    firebase.auth().currentUser ?? undefined
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user ?? undefined);
    });
  }, []);

  return user;
}
