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

function updateTag(tag) {
    const toast = useToast();
    const patchTag = async event => {
        try {
            const res = await fetch (
                api + 'tag/' + tag.tag.data.Id,
                {
                    body: JSON.stringify({
                        Name: event.currentTarget.name.value
                    }),
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    method: 'PATCH'
                })
                {toast({
                    title: "Tag modifié",
                    description: "Le tag a bien été modifié",
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
                <Heading as="h1" color="#fff" paddingLeft="0.5em">Édition du tag numéro {tag.tag.data.Id}</Heading>
            </Box>

            <Box mt={'1em'}>
                <form onSubmit={patchTag}>
                    <FormControl isRequired>
                        <FormLabel htmlFor='name' >Nom</FormLabel>
                        <Input defaultValue={tag.tag.data.Name} id='name' type='text' name='title' mb={"0.5em"}/>
                    </FormControl>
                    <Button m={'1em 0'} color={'#fff'} backgroundColor={'#435d7d'} _hover={'none'} type="submit">Enregistrer</Button>
                </form>
            </Box>    
        </div>
    )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch(api + "tag")
    const tag = await res.json()
    
    // Get the paths we want to pre-render based on posts
    const paths = tag.tag.map(tag => ({
        params: { id: tag.Id.toString()},
    }))
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await fetch(api + `tag/${params.id}`)
    const tag = await res.json()
    
    return {
        props: {
            tag
        }
    }
}

export default updateTag