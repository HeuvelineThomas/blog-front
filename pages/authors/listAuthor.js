import { Navbar } from "../../components/Navbar";
import NextLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Link,
  useToast,
  Heading,
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const api = "http://localhost:3001/";
const front = "http://localhost:3000/";

function authorList(authors) {
  const toast = useToast();
  const deleteAuthor = async (authorId) => {
    const res = await fetch(api + "author/" + authorId, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    const data = await res.json();
    {
      toast({
        title: "Auteur supprimé",
        description: "L'auteur a bien été supprimé",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <div>
        <Navbar />
        <Box bgColor={"#435d7d"} height={"3em"}>
          <Heading as="h1" paddingLeft={"0.5em"} color="#fff">
            Liste des auteurs
          </Heading>
        </Box>
        <Button m={"1em 0"} backgroundColor={"#435d7d"} _hover={"none"}>
          <NextLink href="/authors/createAuthor">
            <Link color={"#fff"} style={{ textDecoration: "none" }}>
              Ajouter un auteur
            </Link>
          </NextLink>
        </Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={"1em"}>Id</Th>
              <Th fontSize={"1em"}>Nom</Th>
              <Th fontSize={"1em"}>Email</Th>
              <Th fontSize={"1em"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {console.log(authors)}
            {authors.authors.author.map((author) => (
              <Tr key={author.Id}>
                <Td>{author.Id}</Td>
                <Td>{author.Name}</Td>
                <Td>{author.Email}</Td>
                <Td>
                  <Button colorScheme="yellow">
                    <NextLink href={`${front}authors/${author.Id}`}>
                      <Link color={"#000"} style={{ textDecoration: "none" }}>
                        Éditer
                      </Link>
                    </NextLink>
                  </Button>

                  <Button colorScheme="red" marginLeft="0.5em">
                    <NextLink href={`/authors/listAuthor`}>
                      <Link
                        onClick={(e) => deleteAuthor(author.Id)}
                        color={"#fff"}
                        style={{ textDecoration: "none" }}
                      >
                        Supprimer
                      </Link>
                    </NextLink>
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(api + "author");
  const authors = await res.json();

  return {
    props: {
      authors,
    },
  };
}

export default authorList;
