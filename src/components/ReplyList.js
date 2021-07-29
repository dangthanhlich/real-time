import React from "react";
import { GetReplies } from "../hooks/reply";
import ReplyItem from "./ReplyItem";

const ReplyList = ({ commentId }) => {
  const [replies] = GetReplies(commentId);

  // console.log(replies);
  return (
    <div className="reply">
      {replies.map((reply) => (
        <ReplyItem reply={reply} commentId={commentId} key={reply.id} />
      ))}
    </div>
  );
};

export default ReplyList;
