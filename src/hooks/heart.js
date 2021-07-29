import { useEffect, useState } from "react";
import firebase, { firestore } from "../libs/firebaseConfig";

export function GetHeart(post) {
  const [heartCount, setHeartCount] = useState(0);
  const [isLove, setIsLove] = useState(false);
  const { uid } = firebase.auth().currentUser;
  useEffect(() => {
    let unsubcribe;
    let query = firestore.collection("hearts").doc(post.id);
    unsubcribe = query.onSnapshot((doc) => {
      const heart = doc.data();
      if (heart) {
        setHeartCount(heart.heartCount);
        if (heart.users[uid]) {
          setIsLove(true);
        } else {
          setIsLove(false);
        }
      } else {
        setHeartCount(0);
      }
    });
    return unsubcribe;
  }, [post, uid]);

  return [heartCount, isLove];
}
