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

function createTag() {
    
    const toast = useToast();
    const router = useRouter();
    const registerTag = async event => {
        try{
            const res = await fetch (
                api + 'tag',
                {
                    body: JSON.stringify({
                        Name: event.target.name.value
                    }),
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    method: 'POST'
                })
                {toast({
                    title: "Tag créé",
                    description: "Le tag a bien été créé",
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
                <Heading as="h1" color="#fff" paddingLeft="0.5em">Création d'un tag</Heading>
            </Box>

            <Box mt={'1em'}>
                <form onSubmit={registerTag}>
                    <FormControl isRequired>
                        <FormLabel htmlFor='name' >Nom</FormLabel>
                        <Input id='email' type='text' name='name' mb={"0.5em"}/>
                    </FormControl>
                    <Button m={'1em 0'} color={'#fff'} backgroundColor={'#435d7d'} _hover={'none'} type="submit">Enregistrer</Button>
                </form>
            </Box>
        </div> 
        
    )
}

export default createTag