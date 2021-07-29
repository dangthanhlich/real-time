import { useEffect, useState } from "react";
import { firestore } from "../libs/firebaseConfig";

export function GetComments(postId) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let unsubcribe;
    let query = firestore
      .collection("comments")
      .where("postId", "==", postId)
      .orderBy("createdAt", "desc");
    unsubcribe = query.onSnapshot((snapShot) => {
      if (snapShot) {
        let comments = [];
        snapShot.forEach((doc) => {
          comments.push({ ...doc.data(), id: doc.id });
        });
        setComments(comments);
      }
    });
    return unsubcribe;
  }, [postId]);

  return [comments];
}
