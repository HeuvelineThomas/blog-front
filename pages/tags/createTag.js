import { useRouter } from 'next/router'
import { Navbar } from '../../components/Navbar'

const api = "http://localhost:3001/"
const front = "http://localhost:3000/"

function createTag() {
    const router = useRouter();
    const registerTag = async event => {
        event.preventDefault();

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
            }
        )
        
        alert("Tag a bien été créé !")
    }
  
    return (

        <div>
            <Navbar/>
            <div className="table-title">
                <h1 className="pageTitle">Création d'un nouveau tag :</h1>
            </div>
        

            <form onSubmit={registerTag}>
                <label className="labelForm" htmlFor="name">Name : </label><br></br>
                <input id="name" name="name" type="text" autoComplete="name" required />
                <br></br>
                <br></br>
                <button type="submit">Register</button>
            </form>
       </div> 
        
    )
}

export default createTag