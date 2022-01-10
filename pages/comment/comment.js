import { useState, useEffect } from "react";
import axios from "axios";

export default function getComments() {
  const url = "http://localhost:3001/comments";
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setComments(response.data.comments);
    });
  }, []);
  console.log(comments);

  return (
    <div>
      {comments.map((comment) => {
        <div key={comment.id}>
          <p>{comment.Content}</p>
          <p>{comment.Date}</p>
        </div>;
      })}
    </div>
  );
}
/*
  <input
        type="text"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <button onClick={submitComment}> Submit </button>
      <button onClick={getComments}> Get all comments</button>

*/
