import { useEffect, useState } from "react";
import { firestore } from "../libs/firebaseConfig";

export function GetReplies(commentId) {
  const [replies, setReplies] = useState([]);
  useEffect(() => {
    let unsubcribe;
    let query = firestore
      .collection("replies")
      .where("commentId", "==", commentId)
      .orderBy("createdAt");
    unsubcribe = query.onSnapshot((snapShot) => {
      if (snapShot) {
        let replies = [];
        snapShot.forEach((doc) => {
          replies.push({ ...doc.data(), id: doc.id });
        });
        setReplies(replies);
      }
    });
    return unsubcribe;
  }, [commentId]);

  return [replies];
}
