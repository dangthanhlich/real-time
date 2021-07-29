import { useEffect, useState } from "react";
import firebase, { firestore } from "../libs/firebaseConfig";

export function GetNotifications() {
  const { uid } = firebase.auth().currentUser;
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    let unsubcribe;
    let query = firestore
      .collection("notifications")
      .where("receiverId", "==", uid)
      .orderBy("createdAt", "desc");
    unsubcribe = query.onSnapshot((snapShot) => {
      if (snapShot) {
        let notifications = [];
        snapShot.forEach((doc) => {
          notifications.push({ ...doc.data(), id: doc.id });
        });
        setNotifications(notifications);
      }
    });
    return unsubcribe;
  }, [uid]);

  return [notifications];
}
