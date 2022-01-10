import axios from "axios";
import { useState, useEffect } from "react";
import {
  Container,
  Text,
  Box,
  Badge,
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
export default function actionPost() {
  const url = "http://localhost:3001/post";

  const [title, setTitle] = useState();
  const [subTitle, setSubtitle] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState(new Date());
  const [tag, setTag] = useState("fun");
  const [image, setImage] = useState("image");

  console.log(title);
  function sendData() {
    let data = {
      Title: title,
      SubTitle: subTitle,
      Content: content,
      Date: date,
      Tags: tag,
      Image: image,
    };
    console.log(data);
    let request = axios.post(url, data);
    if (request.status === 200) {
      alert("form envoyé ");
    }
  }

  return (
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
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Sous titre </FormLabel>
              <InputGroup>
                <Input
                  size="lg"
                  onChange={(event) => setSubtitle(event.currentTarget.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Publication</FormLabel>
              <Textarea
                placeholder="Here is a sample placeholder"
                onChange={(event) => setContent(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel> Tag</FormLabel>
              <Select placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel> Autheur</FormLabel>
              <Select placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>
            <Button onClick={sendData}>Publier</Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
