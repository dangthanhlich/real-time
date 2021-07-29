
import React , { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import { formatDistance } from "date-fns";
import Heart from "./Heart";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { GetComments } from "../hooks/comment";
import { deleteOnePost } from "../libs/post";
const PostItem = ({post,isDetail}) =>{
    const { user } = useContext(AppContext);
    const [comments] = GetComments(post.id);
    const history = useHistory();
    const renderers = {
      code: ({ language, value }) => {
        return (
          <SyntaxHighlighter
            language={language}
            style={dracula}
            children={value}
          />
        );
      },
    };
    const deletePostOnClick = () => {
      deleteOnePost(post);
      if (isDetail) {
        history.push("/dashboard");
      }
    };
  return (
    <>
      <div className="post-item">
        <div>
          <div className="avatar-edit-delete">
            <div className="avatar-wrapper">
              <Link
                to={`/dashboard/user-profile/${post.uid}/${post.displayName}`}
              >
                <img src={post.photoURL} alt="avatar" className="avatar" />
              </Link>
              <span className="tool-tip">{post.displayName}</span>
            </div>
            {user && user.userId === post.uid && (
              <div>
                <Link to={`/dashboard/edit-post/${post.id}`}>
                  {" "}
                  <i className="fas fa-edit"></i>
                </Link>
                <span>
                <i className="fas fa-trash" onClick={deletePostOnClick}></i>
                </span>
              </div>
            )}
          </div>

          <h2 className="heading">
            <Link to={`/dashboard/posts/${post.id}/${post.slugify}`}>
              {post.title}
            </Link>
          </h2>
        </div>
        <div className="time-comment-like">
          <span className="time">
            {post &&
              post.createdAt &&
              formatDistance(post.createdAt.toDate(), new Date(), {
                addSuffix: true,
              })}
          </span>
          <span className="comment"> {comments.length}  comments</span>
          <Heart post={post} />
        </div>
        {post.coverImage && (
          <Link to={`/dashboard/posts/${post.id}/${post.slugify}`}>
            <img src={post.coverImage} alt="post" className="post-image" />
          </Link>
        )}
        {isDetail && (
            <>
              <p style={{ marginTop: "1rem" }}></p>
              <ReactMarkdown children={post.content} renderers={renderers} />
            </>
          )}
      </div>
      )
    </>
  );
}


export default PostItem;