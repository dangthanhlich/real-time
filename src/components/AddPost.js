import React, { useState } from "react";
import "../Css/form.css";
import Form from "./Form";
import slugifyString from "slugify";
import { v1 as uuidv1 } from "uuid";
import { useHistory } from "react-router";
import firebase, { storageRef } from "../libs/firebaseConfig";
import { createOnePost } from "../libs/post";


const AddPost = () => {
   
    const [post, setPost] = useState({title:"demo", content:""});
    let history = useHistory();

    const handeAddPost = async(image) =>{
        let slugify = slugifyString(post.title.trim().toLowerCase());
        if(image)
        {
            const fileName = `${image.name}_${uuidv1()}`;
            post.fileName = fileName;
            var uploadTask = storageRef.child(`images/${fileName}`).put(image);
            //upload ảnh
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
                    createOnePost({ ...post, slugify });
                    history.push("/dashboard");
                  });
                }
              );
        }
        else {
            createOnePost({ ...post, slugify });
            history.push("/dashboard");
        }
    }
    return (
        <div className="post-form">
            <h3>add new post</h3>
            <Form type ="Publish" post={post} setPost = {setPost} handleFormSubmit={handeAddPost}/>
        </div>
    )
}

export default AddPost
