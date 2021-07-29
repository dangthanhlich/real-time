import { useEffect, useState } from "react";
import { firestore } from "../libs/firebaseConfig";

export function GetPosts(type, authorId) {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
      //unsubcribe function
    let unsubcribe;
    let query;
    if (type === "POST-FEEDS") {
      query = firestore
        .collection("posts")
        .orderBy("createdAt", "desc")
        .limit(5);
    }
    if (type === "USER-PROFILE") {
      query = firestore
        .collection("posts")
        .where("uid", "==", authorId)
        .orderBy("createdAt", "desc")
        .limit(5);
    }
    unsubcribe = query.onSnapshot((snapShot) => {
      if (snapShot) {
        let posts = [];
        snapShot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setPosts(posts);
      }
    });

    return unsubcribe;
  }, [type, authorId]);

  return [posts, setPosts];
}

export function GetOnePost(postId) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    let query = firestore.collection("posts").doc(postId);
    let unsubscribe;
    unsubscribe = query.onSnapshot((doc) => {
      setPost({ ...doc.data(), id: postId });
    });
    return unsubscribe;
  }, [postId]);

  return [post, setPost];
}
