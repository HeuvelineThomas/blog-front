import Link from 'next/link'
import { useRouter } from 'next/router'

export const Navbar = () => {
    const router = useRouter()
    return (
        <div>
            <ul className="navbar">
                <li className={router.pathname == "/" ? "active" : ""}>
                    <Link href="/">
                        <a>Accueil</a>
                    </Link>
                </li>
                <li className={router.pathname == "/tags/listTag" ? "active" : ""}>
                    <Link href="/tags/listTag">
                        <a>Tags</a>
                    </Link>
                </li>
                <li className={router.pathname == "/posts/listPost" ? "active" : ""}>
                    <Link href="/">
                        <a>Posts</a>
                    </Link>
                </li>
                <li className={router.pathname == "/authors/listAuthor" ? "active" : ""}>
                    <Link href="/">
                        <a>Authors</a>
                    </Link>
                </li>
                <li className={router.pathname == "/comments/listComment" ? "active" : ""}>
                    <Link href="/">
                        <a>Comments</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}