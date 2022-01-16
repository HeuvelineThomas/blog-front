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



function updateComment(comment) {
    console.log(comment)
    const patchComment = async event => {
        try {
            const res = await fetch (
                api + 'comments/' + comment.comment.data.Id,
                {
                    body: JSON.stringify({
                        Content: event.currentTarget.content.value,
                        Point: event.currentTarget.point.value
                    }),
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    method: 'PATCH'
                })
                {toast({
                    title: "Commentaire modifié",
                    description: "Le commentaire a bien été modifié",
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
                <Heading as="h1" color="#fff" paddingLeft="0.5em">Édition du commentaire numéro {comment.comment.data.Id}</Heading>
            </Box>

            <Box mt={'1em'}>
                <form onSubmit={patchComment}>
                    <FormControl isRequired>
                        <FormLabel htmlFor='name' >Contenu</FormLabel>
                        <Input defaultValue={comment.comment.data.Content} id='content' type='text' name='content' mb={"0.5em"}/>
                        <FormLabel htmlFor='name' >Point</FormLabel>
                        <Input defaultValue={comment.comment.data.Point} id='point' type='text' name='point' mb={"0.5em"}/>
                    </FormControl>
                    <Button m={'1em 0'} color={'#fff'} backgroundColor={'#435d7d'} _hover={'none'} type="submit">Enregistrer</Button>
                </form>
            </Box>    
        </div>
    )
}

export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch(api + "comments")
    const comment = await res.json()
    
    // Get the paths we want to pre-render based on posts
    const paths = comment.comments.map(comment => ({
        params: { id: comment.Id.toString()},
    }))
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    // return comment;
    return { paths, fallback: false }
}



export async function getStaticProps({ params }) {
    const res = await fetch(api + `comments/${params.id}`)
    const comment = await res.json()
    
    return {
        props: {
          comment
        }
    }
}

export default updateComment