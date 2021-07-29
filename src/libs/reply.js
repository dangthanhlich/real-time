import firebase, { firestore } from "./firebaseConfig";

export const createOneReply = (reply) => {
  const { uid, photoURL, displayName } = firebase.auth().currentUser;
  return firestore.collection("replies").add({
    ...reply,
    uid,
    photoURL,
    displayName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
