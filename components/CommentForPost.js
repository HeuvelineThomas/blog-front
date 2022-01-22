import { useState, useEffect } from "react";
import { Text, Box, Badge, Button, Flex, Link } from "@chakra-ui/react";
import axios from "axios";

export default function commentForPost(props) {
  const url = "http://localhost:3001/comments";
  const [allComment, setAllComments] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setAllComments(response.data.comments);
    });
  }, []);
  console.log(allComment);

  return (
    <Text>cuocuc</Text>
    /* <div>
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
          <Flex>
            <NextLink href={`./actionPost?id=${post.Id}`}>
              <Link>Modifier</Link>
            </NextLink>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => dropPost(post.Id)}
            >
              Supprimer
            </Button>
          </Flex>
        </Box>
      ))}
    </div>*/
  );
}
