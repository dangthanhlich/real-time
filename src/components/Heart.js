import React from "react";
import { GetHeart } from "../hooks/heart";
import { createAndUpdateHeart } from "../libs/heart";
import { createOneNotification } from "../libs/notification";

const Heart = ({ post }) => {
    const [heartCount, isLove] = GetHeart(post);
    const handleOnClick = () => {
        createAndUpdateHeart(post);
        if (!isLove) {
          createOneNotification({
            postId: post.id,
            postSlugify: post.slugify,
            receiverId: post.uid,
            type: "like",
          });
        }
      };
    return (
        <span className="like">
        <i
            className={isLove ? "fas fa-heart" : "far fa-heart"} onClick={handleOnClick}
        ></i>
        <span> </span>
        {heartCount}
    </span>
    )
}

export default Heart
