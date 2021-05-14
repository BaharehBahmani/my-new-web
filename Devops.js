import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const SearchCard =(props) =>{
    return(
        <div style={{border:"2px solid black", width:'450px',marginBottom:'10px',height:"250px",marginLeft:"100px"}}>
                <h3>{props.title}</h3>
                <p >By: {props.firstName}</p>
                <p> Category:{props.category}</p>
                <img src={props.image} alt="image" style={{ width:"120px", height:"120px",float:"left", border:'2px solid black',marginLeft:"10px"}} />
                <Link to ={`/detail/${props.id}`} ><button type="submit"  > 
                Read this article
                </button><br></br></Link>
            </div>
    )
}





const Category = () => {

    const [articleList, setArticleList] = useState([]);

    const [filterBy, setFilterBy] = useState(0)


   useEffect(() =>{

       const fetchDataOfPatient = async ()=>{

           try{
               const responce = await axios.get("https://my-json-server.typicode.com/Codaisseur/articles-comments-data/articles")
               console.log("responce", responce);
               setArticleList(responce.data);
           }catch(e){
               console.log(e.message)
           }
       }
       fetchDataOfPatient ();
   },[]) 


   let filteredArticle;

switch(filterBy) {
  case 0:
    filteredArticle = articleList.filter(article => article.categoryId === "devops")
    break;
  case 1:
    filteredArticle = articleList.filter(article => article.categoryId === "frontend")
      break;
  case 2:
    filteredArticle = articleList.filter(article => article.categoryId === "backend")
    break;
    case 3:
        filteredArticle = articleList.filter(article => article)
    break;
  default:
    console.log("please choose your category")
    break;
}
console.log(filteredArticle)
  

    return (
        <div>
            <h2>Categories</h2>
        <label style={{marginRight:"10px"}}>categories:</label>
        <select  style={{marginRight:"350px"}}onChange={event => setFilterBy(parseInt(event.target.value))} value={filterBy}>
          <option value={0}>devops</option>
          <option value={1}>frontend</option>
          <option value={2}>backend</option>
          <option value={3}>All</option>
        </select>


    
    {filteredArticle.map(searchStatus=>
                <SearchCard  key={searchStatus.id} id={searchStatus.id} firstName={searchStatus.author} category={searchStatus.categoryId}  title={searchStatus.title} image={searchStatus.imgUrl} />
                
            )}
      </div>
    );
}
 
export default Category;