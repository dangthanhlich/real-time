import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetPosts } from "../hooks/post";
import LoadMore from "./LoadMore";
import PostItem from "./PostItem";
import SkeletonComponent from "./Skeleton";

const UserProfile = () => {
    const { userId } = useParams();
    const [posts, setPosts] = GetPosts("USER-PROFILE", userId);
    const [isLoadMore, setIsLoadMore] = useState(true);
if (!posts) {
    return (
      <div>
        <SkeletonComponent />
        <SkeletonComponent />
        <SkeletonComponent />
        <SkeletonComponent />
        <SkeletonComponent />
      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <div style={{ padding: "1rem", backgroundColor: "var(--light-gray)" }}>
        <h1>Ooops!!! It seems like we have no post.</h1>
        <Link
          to="/dashboard/add-post"
          style={{ textDecoration: "underline", fontSize: "1.6rem" }}
        >
          <span>Add New Post</span>
        </Link>
      </div>
      
    );
  }
    return (
        <>
      <div className="post-list">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      {isLoadMore && (
        <LoadMore
          posts={posts}
          setPosts={setPosts}
          type="USER-PROFILE"
          setIsLoadMore={setIsLoadMore}
          userId={userId}
        />
      )}
    </>
    )
}

export default UserProfile
