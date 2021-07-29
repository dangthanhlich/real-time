import React, { useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Form from "./Form";
import { GetOnePost } from "../hooks/post";
import firebase, { storageRef } from "../libs/firebaseConfig";
import { v1 as uuidv1 } from "uuid";
import { updateOnePost } from "../libs/post";
import { useHistory } from "react-router";
import SkeletonComponent from "./Skeleton";
import AppContext from "../context/AppContext";
const EditPost = () => {
  const { user } = useContext(AppContext);
  let { postId } = useParams();
  let history = useHistory();
  const [post, setPost] = GetOnePost(postId);
  const handleUpdatePost = async (image) => {
    //Test
    // console.log(image);

    if (image) {
      // Check if fileName exist
      if (post.fileName) {
        await storageRef.child(`images/${post.fileName}`).delete();
      }
      // if fileName not exist (post ko có ảnh)
      const fileName = `${image.name}_${uuidv1()}`;
      post.fileName = fileName;
      var uploadTask = storageRef.child(`images/${fileName}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (firebase.storage.TaskState.RUNNING) {
            console.log("Image Uploaded");
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            post.coverImage = downloadURL;
            updateOnePost(post);
          });
        }
      );
    } else {
      // Check if post.coverImage = null;
      if (!post.coverImage && post.fileName) {
        await storageRef.child(`images/${post.fileName}`).delete();
        post.fileName = null;
      }
      updateOnePost(post);
    }
    history.push("/dashboard");
  };
  if (!post) {
    return <SkeletonComponent />;
  }
  if (!post.title || !post.content) {
    return (
      <div style={{ padding: "1rem", backgroundColor: "var(--light-gray)" }}>
        <h1>Ooops!!! This post is not found.</h1>
        <Link to="/dashboard">
          <span>Go back to Dash Board</span>
        </Link>
      </div>
    );
  }
  if (post.uid !== user.userId) {
    return (
      <div style={{ padding: "1rem", backgroundColor: "var(--light-gray)" }}>
        <h1>Ooops!!! You are not the owner of this post</h1>
        <Link to="/dashboard">
          <span>Go back to Dash Board</span>
        </Link>
      </div>
    );
  }
  return (
    <div className="post-form">
      <h3>Update Post</h3>
      <Form
        post={post}
        setPost={setPost}
        handleFormSubmit={handleUpdatePost}
        type="Update"
      />
    </div>
  );
};

export default EditPost;
