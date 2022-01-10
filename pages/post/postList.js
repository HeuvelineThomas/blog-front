import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Text, Box, Badge, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function postList() {
  console.log("on passe ? ");

  const url = "http://localhost:3001/post";
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setPosts(response.data.post);
    });
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <Box p="10" border={"solid 1px"} margin={"20px"} borderRadius={"10px"}>
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {post.Date}
            </Badge>
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {post.Author}
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {post.Tags}
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {post.Title}
          </Box>

          <Box>
            <Box as="span" color="gray.600" fontSize="sm">
              {post.Subtitle}
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            <Text>{post.Content}</Text>
          </Box>
          <Link href={`post/actionPost/${post.Id}`}>Modifier </Link>
        </Box>
      ))}
    </div>
  );
}
