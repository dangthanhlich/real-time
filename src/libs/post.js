import { useEffect, useState } from "react";
// import { firestore } from "../libs/firebaseConfig";
import firebase, { firestore, storageRef  } from "./firebaseConfig";

export const createOnePost = (post) => {
  const { uid, photoURL, displayName } = firebase.auth().currentUser;
  return firestore.collection("posts").add({
    ...post,
    uid,
    photoURL,
    displayName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

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


export const updateOnePost = (post) => {
  return firebase
    .firestore()
    .collection("posts")
    .doc(post.id)
    .update({ ...post });
};

export const deleteOnePost = async (post) => {
  // Delete image if fileName exist
  if (post.coverImage) {
    await storageRef.child(`images/${post.fileName}`).delete();
  }
  async function deleteCollections(collection) {
    const collections = await firestore
      .collection(collection)
      .where("postId", "==", post.id)
      .get();
    const batch = firestore.batch();
    collections.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }
  // Delete comments
  deleteCollections("comments");
  // Delete replies
  deleteCollections("replies");
  // Delete hearts
  deleteCollections("hearts");
  // Delete notifications
  deleteCollections("notifications");

  // Delete post
  await firestore.collection("posts").doc(post.id).delete();
};
