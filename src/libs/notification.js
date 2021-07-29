import firebase, { firestore } from "./firebaseConfig";

export const createOneNotification = (notification) => {
  const { uid, photoURL, displayName, email } = firebase.auth().currentUser;
  // console.log(notification.receiverId);
  // console.log(uid);

  if (notification.receiverId !== uid) {
    return firestore.collection("notifications").add({
      ...notification,
      senderId: uid,
      senderPhotoURL: photoURL,
      senderName: displayName,
      isRead: false,
      senderEmail: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
};

export const updateNotification = (notificationId) => {
  return firestore.collection("notifications").doc(notificationId).update({
    isRead: true,
  });
};
