import { Navbar } from '../../components/Navbar'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import { deleteTag } from '../tags/deleteTag'

const api = "http://localhost:3001/";
const front = "http://localhost:3000/";


function tagList(tags) {

    const router = useRouter();
    const deleteTag = async tagId => {
        const res = await fetch (
            api + 'tag/' + tagId,
            {
                headers: {
                    'Content-Type' : 'application/json'
                },
                method: 'DELETE'
            }
            )
            const data = await res.json();
            // console.log(data);
        
        alert("Supprimer")
    }
    return (
        <>
         <div>
             <Navbar/>  
            <div className="table-title">
                <h1 className="pageTitle">Liste des tags</h1>
            </div>
            <a href={`${front}tags/createTag`}>
                Create new Tag  
            </a>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {tags.tags.tag.map(tag => 
                    <tr className="test">
                        <td>{tag.Id}</td>
                        <td>{tag.Name}</td>
                        <td>
                            <a href={`${front}tags/${tag.Id}`}>
                                <img className="iconsAction" src="/edit.png"></img>    
                            </a>
                            <Link href="/tags/listTag">
                                <a onClick={(e) => deleteTag(tag.Id)}>
                                    <img className="iconsAction" src="/bin.png"></img>
                                </a>
                            </Link>
                            {/* <button onClick={() => deleteTag(tag.Id)}>Delete</button> */}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
             
         </div>
        
        </>
     )
 }


 export async function getStaticProps() {
      const res =  await fetch(api + "tag")
      const tags = await res.json()

     return {
         props: {
             tags,
         }
     }
 }

 export default tagList