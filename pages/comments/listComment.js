import { Navbar } from '../../components/Navbar'
import NextLink from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
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
} from '@chakra-ui/react'

const api = "http://localhost:3001/";
const front = "http://localhost:3000/";



function commentList(comments) {
    const toast = useToast();
    const deleteComment = async commentId => {
        const res = await fetch (
            api + 'comments/' + commentId,
            {
                headers: {
                    'Content-Type' : 'application/json'
                },
                method: 'DELETE'
            }
            )
            const data = await res.json();       
            {toast({
                title: "Commentaire supprimé",
                description: "Le commentaire a bien été supprimé",
                status: "success",
                duration: 9000,
                isClosable: true,
            })}
    }
    return (
        <>
            <div>
            <Navbar/>  
                <Box bgColor={'#435d7d'} height={'3em'}>
                    <Heading as="h1" paddingLeft={'0.5em'} color="#fff">Liste des commentaires</Heading>
                </Box>
                <Button m={'1em 0'} backgroundColor={'#435d7d'} _hover={'none'}>
                    <NextLink href='/comments/createComment'>
                        <Link color={'#fff'} style={{ textDecoration: 'none'}}>
                            <FontAwesomeIcon icon={faPlus} /> Ajouter un commentaire  
                        </Link>
                    </NextLink>
                </Button>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th fontSize={'1em'}>Id</Th>
                            <Th fontSize={'1em'}>Contenu</Th>
                            <Th fontSize={'1em'}>Point</Th>
                            <Th fontSize={'1em'}>Post</Th>
                            <Th fontSize={'1em'}>Author</Th>
                            <Th fontSize={'1em'}>Date</Th>
                            <Th fontSize={'1em'}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {comments.comments.comments.map(comment => 
                        <Tr key={comment.Id}>
                            <Td>{comment.Id}</Td>
                            <Td>{comment.Content}</Td>
                            <Td>{comment.Point}</Td>
                            <Td>{comment.PostId}</Td>
                            <Td>{comment.CommentId}</Td>
                            <Td>{comment.Date}</Td>
                            <Td>
                                <Button colorScheme='yellow'>
                                    <NextLink href={`${front}comments/${comment.Id}`}>
                                        <Link color={'#000'} style={{ textDecoration: 'none'}}>
                                            Éditer <FontAwesomeIcon icon={faEdit} /> 
                                        </Link>
                                    </NextLink>
                                </Button>
                                
                                <Button colorScheme='red' marginLeft="0.5em">    
                                <NextLink href={`/comments/listComment`}>
                                        <Link onClick={(e) => deleteComment(comment.Id)} color={'#fff'} style={{ textDecoration: 'none'}}>
                                            Supprimer <FontAwesomeIcon icon={faTrash} /> 
                                        </Link>
                                    </NextLink>    
                                </Button>
                            </Td>
                        </Tr>
                    )}
                    </Tbody>
                    </Table>                    
            </div>
        </>
    )
}


export async function getStaticProps() {
    const res =  await fetch(api + "comments")
    const comments = await res.json()

    return {
        props: {
            comments,
        }
    }
}

export default commentList