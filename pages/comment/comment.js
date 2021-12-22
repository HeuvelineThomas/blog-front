import { useState } from "react";

export default function getComments() {
    const url = "http://localhost:3001/comment";
    const [comments, setComments] = useState([]);
    useEffect(() => {
      axios.get(url).then((response) => {
        setComments(response.data.comment);
      });
    }, []);
    console.log(comment);

    return (
        <div>
        <input 
            type='text' 
            value={comment}
            onChange={e => setComment(e.target.value)}/>
        <button onClick={submitComment}> Submit </button>
        <button onClick={getComments}> Get all comments</button>
        {comments.map((comment) => {
            return ( 
                <div key={comment.id}>
                    {comment.content} {comment.author}
                </div>
            )
        })}

        </div>
    )
}