import React, { useState } from "react";
import { formatDistance } from "date-fns";
import ReplySection from "./ReplySection";
import { Link } from "react-router-dom";

const CommentItem = ({ comment }) => {
  const { content, photoURL, displayName, createdAt, uid } = comment ;
  const [openReplyForm, setOpenReplyForm] = useState(false);
  console.log(comment);

  return (
    <div className="commnent-item">
      <div className="comment-container">
        <div className="avatar-comment">
          <div className="avatar-wrapper">
            <Link to={`/dashboard/user-profile/${uid}/${displayName}`}>
              <img src={photoURL} alt="avatar" className="avatar" />
            </Link>
            <span className="tool-tip">{displayName}</span>
          </div>
          <div className="comment">
            <p>
              {content.split("\n").map((text, i) => (
                <span key={i}>
                  {text}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="time-reply">
          <span className="time">
            {" "}
            {createdAt &&
              formatDistance(createdAt.toDate(), new Date(), {
                addSuffix: true,
              })}
          </span>
          <label
            className="reply-btn"
            htmlFor={comment.id}
            onClick={() => setOpenReplyForm(true)}
          >
            Reply
          </label>
        </div>
        <ReplySection
          openReplyForm={openReplyForm}
          commentId={comment.id}
          comment={comment}
          setOpenReplyForm={setOpenReplyForm}
        />
      </div>
    </div>
  );
};

export default CommentItem;
