import React from "react";
import { useEffect, useState } from "react";
import { BaseSyntheticEvent } from "react-router/node_modules/@types/react";
import { useDispatch, useSelector } from "react-redux";
import { comment, like } from "../../actions/posts";

function FeedPostCard(props: any) {
  const dispatch = useDispatch();
  const date = new Date(props.post.createdAt).toLocaleString();
  const [commentMessage, setcommentMessage] = useState("");
  const changeCommentMessage = (event: BaseSyntheticEvent) => {
    setcommentMessage(event.target.value);
  };
 /* const user = JSON.parse(
    useSelector((state: any) => state.authentication).user
  );*/
  const user = JSON.parse(localStorage.getItem('user')!)
  const submitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      comment(
        props.post._id,
        {
          username: user.username,
          user: user._id,
          text: commentMessage,
        },
        props.index
      )
    );
    setcommentMessage("");
  };
  const likeComment = () => {
    dispatch(
      like(props.post._id, {
        user: user._id,
      }, 
      props.index)
    );
  };
  useEffect(() => {}, []);
  return (
    <div className="bg-white md:mx-64 my-5 border-2 border-gray-50 rounded-lg">
      <div className="px-3 py-1">
        <span className="text-xl">{props.post.userProfile[0].username}, </span>
        <span>{props.post.userProfile[0].profile.location.city}</span>
        <span className="pl-3">{date}</span>
      </div>
      <div className="px-3 pb-1">{props.post.text}</div>
      <div className="px-3">
        {props.post.likes.includes(user._id) ? (
          <div className="text-red-500 inline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <button onClick={() => likeComment()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
        {props.post.likes.length > 0 ? (
          <p className="text-red-500 inline align-middle pl-1">
            {props.post.likes.length}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="my-3 mx-2 border-2 rounded-lg">
        <form onSubmit={(e) => submitComment(e)}>
          <input
            className="w-full p-1"
            type="text"
            placeholder="Write a comment.."
            value={commentMessage}
            onChange={(e) => changeCommentMessage(e)}
          ></input>
        </form>
      </div>
      {props.post.comments
        ? props.post.comments.map((comment: any, index: string) => (
            <div key={index} className="my-4 mx-2 bg-gray-100 rounded-lg">
              <p className="px-2 text-sm font-bold">{comment.username}</p>
              <p className="px-3 pb-2 text-sm">{comment.text}</p>
            </div>
          ))
        : ""}
    </div>
  );
}

export default FeedPostCard;
