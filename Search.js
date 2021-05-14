import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const SearchCard =(props) =>{
    return(
        <div style={{border:"2px solid black", width:'450px',marginBottom:'10px',height:"250px",marginLeft:"100px"}}>
                <h3>{props.title}</h3>
                <p >By: {props.firstName}</p>
                <p> Category:<Link to ={`/devops`}>{props.category}</Link></p>
                <img src={props.image} alt="image" style={{ width:"120px", height:"120px",float:"left", border:'2px solid black',marginLeft:"10px"}} />
                <Link to ={`/detail/${props.id}`} ><button type="submit"  > 
                Read this article
                </button><br></br></Link>
            </div>
    )
}


const SearchArticle = () => {
    // const [articleList, setArticleList] = useState([]);
    const [searchResults,setSearchResults] = useState([]);

    const [search, setSearch] = useState(null)
    // const [searchStatussearchResults,setSearchStatus]= useState({status :'idle'})
    

    //all articles
    useEffect(() =>{
      const fetchDataOfArticle = async () => {
        console.log('starting ....')
          try{
              const responce = await axios.get("https://my-json-server.typicode.com/Codaisseur/articles-comments-data/articles")
              console.log("responce", responce);
              const tempItems = responce.data;
              tempItems.sort((a, b) => new Date(...b.date.split('/').reverse()) - new Date(...a.date.split('/').reverse()));
                // setArticleList(tempItems);
                setSearchResults(tempItems);
            }catch(e){
              console.log(e.message)
            }
        }
      fetchDataOfArticle ();
    },[]) 

    if(!searchResults || searchResults.length===0){
        return (
            <div>"please write your category again,thanks"</div>
        )
    }

    //prevent the page loading several times
 const onFormSubmit = async (event) => {
     event.preventDefault();

        try{
            // setSearchStatus({status:'searching'})
            //call Api
            
            const response = await axios.get(`https://my-json-server.typicode.com/Codaisseur/articles-comments-data/categories/${search}/articles`)

            console.log("error response", response.data);
                setSearchResults(response.data);
            // setSearchStatus({status:'done',data:response.data});
            console.log("it is printing ")
            console.log(response.data);

        }catch(e){
            console.log(e.message)
        }

    } 


    return ( 
        <div style={{border:"2px solid black"}}>
            <div>
                <form onSubmit={onFormSubmit}>
                    <input
                        type="text"
                        value={search}
                        placeholder="search ..."
                        onChange={event => setSearch(event.target.value)}
                        style={{height:"30px"}}
                    />
                    <button type="submit" style={{marginBottom:"20px",height:"30px"}}>Search</button>
                    <p style ={{fontSize:"20px",float:"right", paddingRight:"15px"}}>{searchResults.length} articles found</p>
                </form>
            </div>

           
            {searchResults.map(searchStatus=>
                <SearchCard  key={searchStatus.id} id={searchStatus.id} firstName={searchStatus.author} category={searchStatus.categoryId}  title={searchStatus.title} image={searchStatus.imgUrl} />
                
            )}
              
        </div>
        
    );
    
}
 
export default SearchArticle;