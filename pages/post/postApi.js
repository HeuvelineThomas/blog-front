import axios from "axios";
import { useState, useEffect } from "react";

export default function postList() {
  const url = "localhost:3001/post";
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setPost(response.data);
    });
  });

  return;
}
