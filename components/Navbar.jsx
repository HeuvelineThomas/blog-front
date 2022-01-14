import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
    Box,
    Menu,
    MenuButton,
    Link,
    Button,
} from '@chakra-ui/react'


export const Navbar = () => {
    const router = useRouter()
    return (
        <div>
            <Box border={'solid', '1px', '#e7e7e7'} backgroundColor={'#f3f3f3'} width={'auto'} mb={'1em'}>
                <Menu >
                    <MenuButton onClick={() => router.push("/")} as={Button} borderRadius={'0'} height={"3em"} backgroundColor={'#f3f3f3'} _hover={{ bg:'#dbdbdb'}}>
                        Accueil
                    </MenuButton>
                    <MenuButton onClick={() => router.push("/post/postList")} as={Button} borderRadius={'0'} height={"3em"} backgroundColor={'#f3f3f3'} _hover={{ bg:'#dbdbdb'}}>
                        Posts
                    </MenuButton>
                    <MenuButton onClick={() => router.push("/authors/listAuthor")} as={Button} borderRadius={'0'} height={"3em"} backgroundColor={'#f3f3f3'} _hover={{ bg:'#dbdbdb'}}>
                        Authors
                    </MenuButton>
                    <MenuButton onClick={() => router.push("/comments/listComment")} as={Button} borderRadius={'0'} height={"3em"} backgroundColor={'#f3f3f3'} _hover={{ bg:'#dbdbdb'}}>
                        Comments
                    </MenuButton>
                    <MenuButton onClick={() => router.push("/tags/listTag")} as={Button} borderRadius={'0'} height={"3em"} backgroundColor={'#f3f3f3'} _hover={{ bg:'#dbdbdb'}}>
                        Tags
                    </MenuButton>
                </Menu>
            </Box>
        </div>
    )
}