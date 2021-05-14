import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CommentCard =(props)=> {
    return(
        <div style={{border:"2px solid black",width:"200px",float:"right",marginTop:"10px"}}>
            <h3>{props.name}</h3>
            <p >{props.comment}</p>
       
        </div>

    )
}


const Details = () => {

  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [fullArticle, setFullArticle] = useState(null);
  const params = useParams();
  const [commentsList,setCommentsList] = useState([]);

 //////////////for form
  const [isFormSubmitted, setFormSubmitted] = useState(false)
  const formSubmit = (event) => {
        event.preventDefault() // prevent the form from refreshing the page
        console.log("form submitted:", { name, comment })
        setFormSubmitted(true)

        const data = { name,comment} 
    }
 //////////////////////////

  console.log("My router params in this page", params)

  const {id} = params;


  useEffect(() => {

        const fetchData = async () => {
            try {
                console.log()
                const response = await axios.get(`https://my-json-server.typicode.com/Codaisseur/articles-comments-data/articles/${id}`);
                console.log(response.data)
                setFullArticle(response.data);
                const responseComments = await axios.get(`https://my-json-server.typicode.com/Codaisseur/articles-comments-data/articles/${id}/comments`);
                setCommentsList(responseComments.data);
            } catch(e) {
                console.log(e);
            }
        }
    fetchData();
  },[id])  
  if(!id){
    return <div>Id is not set</div>
}
  if (!fullArticle) {
    return (
      <div>
        Loading....
      </div>
    )
  }

  return (
       <div style={{width:'500px', marginLeft:'100px'}}>
           
            <h2>{fullArticle.title} </h2>
            <p>By:{fullArticle.author}</p>
            <p>By:{fullArticle.date}</p>
            <img src={fullArticle.imgUrl} style={{width:"200px",float:"left"}}/>
           <div style={{border:'2px solid black',backgroundColor:"gray",color:"white",width:"700px",height:"200px"}}>
                <p style={{paddingTop:"30px"}}>{fullArticle.content}</p>

            </div>
            <div >
                <div >
                <form onSubmit={(e) => formSubmit(e)} style={{marginTop:"20px"}}>
                    <div>
                        <label>     Name  </label>
                        <input type="text" style={{marginBottom:"20px"}} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div>
                        <label>  Comment </label>
                        <input type="text" style={{marginBottom:"20px"}} onChange={(event) => setComment(event.target.value)} />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                        {isFormSubmitted && (
                            <div>{name} {comment} </div>
                        )}
                </form>
                </div>
                <div style={{border:"2px solid black", height:"100px",float:"right",width:"300px",marginTop:"20px"}}>
                    <div >
                        <div >
                             Name: {name}
                        </div>
                    </div>

                    <div >
                        <div >
                            Comment: {comment}
                        </div>
                    </div>
                </div>
                
            </div>

            {commentsList.map(searchStatus=>
                <CommentCard  key={searchStatus.id}  name={searchStatus.name} comment={searchStatus.comment}   />
                
            )}
        </div>   
    );
}

export default Details;