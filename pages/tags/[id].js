import { Navbar } from '../../components/Navbar'
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'PATCH'],
})

const api = "http://localhost:3001/";
  

const updateTag = async event => {
    event.preventDefault();
    console.log(event.target.name.value)

    try {
        const res = await fetch (
            api + 'tag/12',
            {
                body: JSON.stringify({
                    Name: event.target.name.value
                }),
                headers: {
                    'Content-Type' : 'application/json'
                },
                method: 'PATCH'
            }
            )
            alert("Tout à bien été envoyé")
            router.reload(window.location.pathname)
    } catch(err) {
        console.log(err)
    }

}

function editTag(tags) {
    return (
        <div>
            <Navbar/>
            <div className="table-title">
                <h1 className="pageTitle">Edition du tag numéro {tags.tags.data.Id}</h1>
            </div>
            
            <form onSubmit={updateTag}>
                <label className="labelForm" htmlFor="name">Name : </label><br></br>
                <input id="name" defaultValue={tags.tags.data.Name} name="name" type="text" autoComplete="name" required />
                <br></br>
                <br></br>
                <button onClick={updateTag} type="submit">Register</button>
                {/* <button type="submit">Register</button> */}
            </form>
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
    const tags = await res.json()

     return {
         props: {
             tags
         }
     }
 }

 export default editTag