import firebase, { firestore } from "./firebaseConfig";

export const createOneComment = (comment) => {
  const { uid, photoURL, displayName } = firebase.auth().currentUser;
  return firestore.collection("comments").add({
    ...comment,
    uid,
    photoURL,
    displayName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
