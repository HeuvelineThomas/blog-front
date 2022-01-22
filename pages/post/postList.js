import axios from "axios";
import { Navbar } from "../../components/Navbar";
import { useState, useEffect } from "react";
import { Text, Box, Badge, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useToast } from "@chakra-ui/react";
import CommentForPost from "../../components/CommentForPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function postList() {
  const url = "http://localhost:3001/post";
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const front = "http://localhost:3000/";
  const api = "http://localhost:3001/";

  const toast = useToast();

  function dropPost(id) {
    axios.delete(url + "/" + id).then((response) => {
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

  const deleteComment = async (commentId) => {
    const res = await fetch(api + "comments/" + commentId, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    const data = await res.json();
    {
      toast({
        title: "Commentaire supprimé",
        description: "Le commentaire a bien été supprimé",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    axios.get(url).then((response) => {
      setPosts(response.data.post);
    });
    axios.get("http://localhost:3001/tag").then((response) => {
      setTags(response.data.tags);
    });

    axios.get("http://localhost:3001/comments").then((response) => {
      console.log(response.data.comments);
      setAllComments(response.data.comments);
    });
    console.log(allComments);
  }, []);

  console.log(allComments);
  function commentForPost(idProject) {
    const data = new Array();
    allComments.map((comment) => {
      if (comment.post === idProject) {
        data.push(comment);
      }
    });
    return data;
  }

  /*
  useEffect(() => {
    axios.get("http://localhost:3001/tag/" + tagId).then((response) => {
      setPosts(response.data.post);
    });
  });*/
  return (
    <div>
      <Navbar />
      <NextLink href={`./actionPost`} passHref>
        <Link
          as={Button}
          colorScheme="teal"
          variant="solid"
          textAlign={"right"}
        >
          Nouveau post{" "}
        </Link>
      </NextLink>

      {posts.map((post) => (
        <>
          <Box
            p="10"
            border={"solid 1px"}
            margin={"20px"}
            borderRadius={"10px"}
          >
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
              <Button colorScheme="teal" variant="solid" mr={"10px"}>
                <NextLink href={`./actionPost?id=${post.Id}`}>
                  <Link>Modifier</Link>
                </NextLink>
              </Button>
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => dropPost(post.Id)}
              >
                Supprimer
              </Button>
            </Flex>
            <Box mt={"20px"}>
              <Text mb={"10px"}>Commentaires</Text>
              {commentForPost(post.Id).map((comment) => (
                <Box
                  p="10"
                  border={"solid 1px"}
                  borderRadius={"10px"}
                  mb={"10px"}
                >
                  <Flex>
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      {comment.Date}
                    </Badge>
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      {comment.Point} Points
                    </Badge>
                  </Flex>
                  <Box display="flex" mt="2" alignItems="center">
                    <Text>{comment.Content}</Text>
                  </Box>
                  <NextLink href={`${front}comments/${comment.Id}`}>
                    <Link
                      color={"#000"}
                      style={{ textDecoration: "none" }}
                      mr={"10px"}
                    >
                      <Button colorScheme="teal" variant="solid">
                        Éditer <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </Link>
                  </NextLink>
                  <Button colorScheme="teal" variant="solid">
                    <NextLink href={`/comments/listComment`}>
                      <Link
                        onClick={(e) => deleteComment(comment.Id)}
                        color={"#fff"}
                        style={{ textDecoration: "none" }}
                      >
                        Supprimer <FontAwesomeIcon icon={faTrash} />
                      </Link>
                    </NextLink>
                  </Button>
                </Box>
              ))}
              <NextLink href={`/comments/createComment?idPost=${post.Id}`}>
                <Link color={"#fff"} style={{ textDecoration: "none" }}>
                  <Button colorScheme="teal" variant="solid">
                    <FontAwesomeIcon icon={faPlus} /> Ajouter un commentaire
                  </Button>
                </Link>
              </NextLink>
            </Box>
          </Box>
        </>
      ))}
    </div>
  );
}
