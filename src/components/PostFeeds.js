
import React, { useState } from "react";
import { GetPosts } from "../hooks/post";
import PostItem from "./PostItem";
import "../Css/post.css";
import SkeletonComponent from "./Skeleton";
import {Link} from "react-router-dom";
import LoadMore from "./LoadMore";

const PostFeeds = () => {
    const [posts, setPosts] = GetPosts("POST-FEEDS");
    const [isLoadMore, setIsLoadMore] = useState(true);
    if(!posts)
    {
        return (
            <div className ="post-list">
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
        </div>
        );
    }
    if(posts.length === 0){
        <div style={{ padding: "1rem", backgroundColor: "var(--light-gray)" }}>
        <h1>Ooops!!! It seems like we have no post.</h1>
        <Link to="/dashboard/add-post">
          <span>Add New Post</span>
        </Link>
      </div>
    }
    return (
        <>
        <div className="post-list">
            {posts.map((post) => (
            <PostItem key={post.id} post={post} />
            ))}
        </div>
        {/* <LoadMore posts={posts} setPosts = {setPosts} type="POST-FEEDS"/> */}
        { isLoadMore && (
        <LoadMore
          posts={posts}
          setPosts={setPosts}
          type="POST-FEEDS"
          setIsLoadMore={setIsLoadMore}
        />
      )}
        </>
    )
}

export default PostFeeds
