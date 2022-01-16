import { useState, useEffect } from "react";
import axios from "axios";
import { Text, Box, Badge, Button, Flex, Link } from "@chakra-ui/react";

/*
export default function handler(req, res) {
    if (req.method === 'GET'){
        res.status(200).json({ name: 'John Doe' })
    } else if (req.method === 'POST'){
        const comment = req.body.comment
        const newComment = {
            Content : comment,
            Date : String(Date.now()),
            Point : 0,
            // post : 
            // author : 
        }
    }
  }*/
export default function getComments() {
  const url = "http://localhost:3001/comments";
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setComments(response.data.comments);
    });
  }, []);
  return (
    <Box p={"10"} border={"solid 1px"} width={"30%"}>
      {comments.map((comment) => (
        <Box key={comment.Id} className={"blabla"}>
          <Text>{comment.Content}</Text>
          <p>{comment.Date}</p>
        </Box>
      ))}
    </Box>
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
