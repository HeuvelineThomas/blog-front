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
} from "@chakra-ui/react"



const api = "http://localhost:3001/"
const front = "http://localhost:3000/"

function createAuthor() {
    
    const toast = useToast();
    const router = useRouter();
    const registerAuthor = async event => {
        try{
            const res = await fetch (
                api + 'author',
                {
                    body: JSON.stringify({
                        Name: event.target.name.value,
                        Email: event.target.email.value
                    }),
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    method: 'POST'
                })
                {toast({
                    title: "auteur créé",
                    description: "L'auteur a bien été créé",
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
                <Heading as="h1" color="#fff" paddingLeft="0.5em">Création d'un auteur</Heading>
            </Box>

            <Box mt={'1em'}>
                <form onSubmit={registerAuthor}>
                    <FormControl isRequired>
                        <FormLabel htmlFor='name' >Nom</FormLabel>
                        <Input id='name' type='text' name='name' mb={"0.5em"}/>
                        <FormLabel htmlFor='email' >Email</FormLabel>
                        <Input id='email' type='text' name='email' mb={"0.5em"}/>
                    </FormControl>
                    <Button m={'1em 0'} color={'#fff'} backgroundColor={'#435d7d'} _hover={'none'} type="submit">Enregistrer</Button>
                </form>
            </Box>
        </div> 
        
    )
}

export default createAuthor