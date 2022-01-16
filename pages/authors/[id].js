import { Navbar } from '../../components/Navbar'
import { 
    Box,
    Heading, 
    FormControl, 
    FormLabel, 
    Input, 
    useToast, 
    Button } 
from "@chakra-ui/react"


const api = "http://localhost:3001/";

function updateAuthor(author) {
    const toast = useToast();
    const patchAuthor = async event => {
        try {
            const res = await fetch (
                api + 'author/' + author.author.data.Id,
                {
                    body: JSON.stringify({
                        Name: event.currentTarget.name.value,
                        Email: event.currentTarget.email.value
                    }),
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    method: 'PATCH'
                })
                {toast({
                    title: "Auteur modifié",
                    description: "L'auteur a bien été modifié",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })}
        } catch(err) {
            console.log(err)
        }
    }
    
    return (
        <div>
            <Navbar/>
            <Box bgColor={'#435d7d'} height={'3em'}>
                <Heading as="h1" color="#fff" paddingLeft="0.5em">Édition de l'auteur numéro {author.author.data.Id}</Heading>
            </Box>

            <Box mt={'1em'}>
                <form onSubmit={patchAuthor}>
                    <FormControl isRequired>
                        <FormLabel htmlFor='name' >Nom</FormLabel>
                        <Input defaultValue={author.author.data.Name} id='name' type='text' name='name' mb={"0.5em"}/>
                        <FormLabel htmlFor='email' >Email</FormLabel>
                        <Input defaultValue={author.author.data.Email} id='email' type='text' name='email' mb={"0.5em"}/>
                    </FormControl>
                    <Button m={'1em 0'} color={'#fff'} backgroundColor={'#435d7d'} _hover={'none'} type="submit">Enregistrer</Button>
                </form>
            </Box>    
        </div>
    )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch(api + "author")
    const author = await res.json()
    
    // Get the paths we want to pre-render based on posts
    const paths = author.author.map(author => ({
        params: { id: author.Id.toString()},
    }))
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await fetch(api + `author/${params.id}`)
    const author = await res.json()
    
    return {
        props: {
            author
        }
    }
}

export default updateAuthor