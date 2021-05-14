import {Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';


const SearchCard =(props) =>{
    return(
        <div style={{border:"2px solid black", width:'450px',marginBottom:'10px',height:"250px",marginLeft:"200px"}}>
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


const Home = () => {
    const [articleList, setArticleList] = useState([]);


    
    

    useEffect(() =>{

        const fetchDataOfArticle = async ()=>{

            try{
                const responce = await axios.get("https://my-json-server.typicode.com/Codaisseur/articles-comments-data/articles")
                console.log("responce", responce);
                const tempItems = responce.data;
                //I check atackoverflow "https://stackoverflow.com/questions/41058681/sort-array-by-dates-in-react-js"
                tempItems.sort((a, b) => new Date(...b.date.split('/').reverse()) - new Date(...a.date.split('/').reverse()));
                setArticleList(tempItems);
            }catch(e){
                console.log(e.message)
            }
        }
        fetchDataOfArticle ();
    },[]) 

    if(!articleList || articleList.length===0){
        return (
            <div>
                Loading data
            </div>
        )
    }
   //sort the articleList and then define the lastArticle and  choose the index 0 from articleList
    
    const lastArticle = articleList[0];
    console.log(lastArticle)
  
    return ( 
        <div>
            <h3 sytle={{float:"left"}}>Read the last article:</h3>

            < SearchCard key={lastArticle.id} id={lastArticle.id} firstName={lastArticle.author} category={lastArticle.categoryId} title={lastArticle.title} image={lastArticle.imgUrl} /> 
             
             <Link to ="/Search" >
                <button type="submit"style={{height:"35px", width:"200px", marginTop:'30px',marginBottom:'10px'}}>
                     Search articles
                </button>
            </Link>

        </div>
        
    );
    
}
export default Home;



