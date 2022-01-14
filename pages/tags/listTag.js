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

function tagList(tags) {
    const toast = useToast();
    const deleteTag = async tagId => {
        const res = await fetch (
            api + 'tag/' + tagId,
            {
                headers: {
                    'Content-Type' : 'application/json'
                },
                method: 'DELETE'
            }
            )
            const data = await res.json();       
            {toast({
                title: "Tag supprimé",
                description: "Le tag a bien été supprimé",
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
                    <Heading as="h1" verticalAlign={'middle'} color="#fff">Liste des tags</Heading>
                </Box>
                <Button m={'1em 0'} backgroundColor={'#435d7d'} _hover={'none'}>
                    <NextLink href='/tags/createTag'>
                        <Link color={'#fff'} style={{ textDecoration: 'none'}}>
                            <FontAwesomeIcon icon={faPlus} /> Ajouter un tag  
                        </Link>
                    </NextLink>
                </Button>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th fontSize={'1em'}>Id</Th>
                            <Th fontSize={'1em'}>Nom</Th>
                            <Th fontSize={'1em'}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {tags.tags.tag.map(tag => 
                        <Tr key={tag.Id}>
                            <Td>{tag.Id}</Td>
                            <Td>{tag.Name}</Td>
                            <Td>
                                <Button colorScheme='yellow'>
                                    <NextLink href={`${front}tags/${tag.Id}`}>
                                        <Link color={'#000'} style={{ textDecoration: 'none'}}>
                                            Éditer <FontAwesomeIcon icon={faEdit} /> 
                                        </Link>
                                    </NextLink>
                                </Button>
                                
                                <Button colorScheme='red' marginLeft="0.5em">    
                                <NextLink href={`/tags/listTag`}>
                                        <Link onClick={(e) => deleteTag(tag.Id)} color={'#fff'} style={{ textDecoration: 'none'}}>
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
    const res =  await fetch(api + "tag")
    const tags = await res.json()

    return {
        props: {
            tags,
        }
    }
}

export default tagList