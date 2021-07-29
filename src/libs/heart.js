import firebase, { firestore } from "./firebaseConfig";

export const createAndUpdateHeart = async (post) => {
  const { uid } = firebase.auth().currentUser;
  let query = firestore.collection("hearts").doc(post.id);
  const heart = (await query.get()).data();

  if (!heart) {
    query.set({ heartCount: 1, users: { [uid]: true }, postId: post.id });
  } else {
    if (heart.users[uid]) {
      let heartCount = heart.heartCount - 1;
      query.update({ heartCount, users: { ...heart.users, [uid]: false } });
    } else {
      let heartCount = heart.heartCount + 1;
      query.update({ heartCount, users: { ...heart.users, [uid]: true } });
    }
  }
};
