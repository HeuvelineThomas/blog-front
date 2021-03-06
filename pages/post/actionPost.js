import axios from "axios";
import { Navbar } from "../../components/Navbar";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function actionPost(props) {
  //const url = "http://localhost:3001/post";

  const [title, setTitle] = useState();
  const [subTitle, setSubtitle] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState(new Date().toString());
  const [tag, setTag] = useState();
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState("image");
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState([]);

  const toast = useToast();

  const url = "http://localhost:3001/post/";
  const { query } = useRouter();
  useEffect(() => {
    if (query.id) {
      axios.get(url + query.id).then((response) => {
        setTitle(response.data.data.Title);
        setSubtitle(response.data.data.Subtitle);
        setTag(response.data.data.Tags);
        setImage(response.data.data.Image);
        setContent(response.data.data.Content);
        setDate(response.data.data.Date);
      });
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/tag/").then((response) => {
      setTags(response.data.tag);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/author/").then((response) => {
      setAuthors(response.data.author);
    });
  }, []);

  function sendData() {
    let data = {
      Title: title,
      Subtitle: subTitle,
      Content: content,
      Date: date,
      Tags: tag,
      Image: image,
      Author: author,
      Tag: tag,
    };

    axios.post(url, data).then((response) => {
      if (response.status == 201) {
        toast({
          title: "Article ajouté",
          description: "Votre article a bien été publié",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Erreur lors de l'ajout de l'article",
          description:
            "Il y a eu un problème lors de la publication de votre article veuillez réessayer ",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  }

  function updateData() {
    let data = {
      Title: title,
      Subtitle: subTitle,
      Content: content,
      Date: date,
      Tags: tag,
      Image: image,
    };

    axios.patch(url + query.id, data).then((response) => {
      if (response.status == 200) {
        toast({
          title: "Article modifié",
          description: "Votre article a bien été modifié",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Erreur lors de la modification de l'article",
          description:
            "Il y a eu un problème lors de la modification de votre article veuillez réessayer ",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  }
  return (
    <>
      {" "}
      <Navbar />
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="1000px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Ajouter un post</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={sendData}>
              <FormControl isRequired>
                <FormLabel>Titre</FormLabel>
                <Input
                  size="lg"
                  onChange={(event) => setTitle(event.currentTarget.value)}
                  value={title}
                />
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Sous titre </FormLabel>
                <InputGroup>
                  <Input
                    size="lg"
                    onChange={(event) => setSubtitle(event.currentTarget.value)}
                    value={subTitle}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Publication</FormLabel>
                <Textarea
                  placeholder="Here is a sample placeholder"
                  onChange={(event) => setContent(event.currentTarget.value)}
                  value={content}
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel> Tag</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={(event) => setTag(event.currentTarget.value)}
                >
                  {tags.map((tag) => (
                    <option value={tag.Id}>{tag.Name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={6}>
                <FormLabel> Autheur</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={(event) => setAuthor(event.currentTarget.value)}
                >
                  {authors.map((author) => (
                    <option value={author.Id}>{author.Name}</option>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={query.id ? updateData : sendData}>
                Publier
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
