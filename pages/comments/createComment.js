import { useRouter } from 'next/router'
import { Navbar } from '../../components/Navbar'
import { 
    Box,
    Button,
    Heading, 
    FormControl,
    FormLabel,
    Input,
    useToast, 
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select
} from "@chakra-ui/react"



const api = "http://localhost:3001/"
const front = "http://localhost:3000/"

2
const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


function createComment() {
    
    const toast = useToast();
    const router = useRouter();
    const registerComment = async event => {
        try{
            const res = await fetch (
                api + 'comments',
                {
                    body: JSON.stringify({
                        Content: event.target.content.value,
                        Point: event.target.point.value,
                        // post: event.target.post.value,
                        // author: event.target.author.value,
                        Date: event.target.date.value
                    }),
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    method: 'POST'
                })
                console.log(res.status)
                {toast({
                    title: "Commentaire créé" + res.status,
                    description: "Le commentaire a bien été créé",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })}
        }catch(err){
            console.log(err)
        }
    }
    return (

        <div>
            <Navbar/>
            <Box bgColor={'#435d7d'} height={'3em'}>
                <Heading as="h1" color="#fff" paddingLeft="0.5em">Création d'un commentaire</Heading>
            </Box>

            <Box mt={'1em'}>
                <form onSubmit={registerComment}>
                    <FormControl isRequired>
                        <FormLabel htmlFor='name' >Content</FormLabel>
                        <Input id='content' type='text' name='content' mb={"0.5em"}/>
                        <FormLabel htmlFor='name' >Point</FormLabel>
                        {/* <Input id='point' type='text' name='point' mb={"0.5em"}/> */}
                        <NumberInput id='point' name='point' defaultValue={15} max={30} clampValueOnBlur={false}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormLabel htmlFor='name' >Date</FormLabel>
                        <Input isDisabled id='date' type='text' value={date} name='date' mb={"0.5em"}/>
                        {/* <FormLabel htmlFor='name' >Auteur</FormLabel> */}
                        {/* <Select placeholder="Select option"> 
                            {authors.authors.author.map((author) => (
                            <option name='author' value={author.Id}>{author.Name}</option>
                            ))}
                        </Select>
                        <FormLabel htmlFor='name' >Post</FormLabel>
                        <Select
                            placeholder="Select option"
                            // onChange={(event) => setTag(event.currentTarget.value)}
                        >
                            {authors.posts.post.map((post) => (
                            <option name='post' value={post.Id}>{post.Title}</option>
                            ))}
                        </Select>  */}
                    </FormControl>
                    <Button m={'1em 0'} color={'#fff'} backgroundColor={'#435d7d'} _hover={'none'} type="submit">Enregistrer</Button>
                </form>
            </Box>
        </div> 
        
    )
}

// export async function getStaticProps() {
//     const res = await fetch(api + `author`)
//     const authors = await res.json()

//     const res1 = await fetch(api + `post`)
//     const posts = await res1.json()
    
//     return {
//         props: {
//             posts,
//             authors,
//         }
//     }
// }



export default createComment