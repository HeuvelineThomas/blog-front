import axios from "axios";
import { useState, useEffect } from "react";
import { Text, Box, Badge, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useToast } from "@chakra-ui/react";

export default function postList() {
  const url = "http://localhost:3001/post";
  const [posts, setPosts] = useState([]);
  const toast = useToast();

  function dropPost(id) {
    axios.delete(url + "/" + id).then((response) => {
      console.log(url + "/" + id);
      if (response.status === 200)
        toast({
          title: "Article supprimé",
          description: "Votre article a bien été supprimé",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
    });
  }
  useEffect(() => {
    axios.get(url).then((response) => {
      setPosts(response.data.post);
    });
  });
  return (
    <div>
      <NextLink href={`./actionPost`} passHref>
        <Link as={Button} colorScheme="teal" variant="solid">
          Nouveau post{" "}
        </Link>
      </NextLink>

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
    </div>
  );
}
