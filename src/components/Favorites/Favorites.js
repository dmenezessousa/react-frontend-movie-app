import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from "axios"; 
import "./Favorites.css";
import Loading from '../common/Loading';

function Favorites() {
    const [moviesArray, setMoviesArray] = useState("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllMovies();
    },[]);

    useEffect(()=>{
        setTimeout(()=> setLoading(false),500)
    },[]);

    async function getAllMovies (){
        try{
            let url = process.env.NODE_ENV === "production" 
            ? "https://backend-passport-movie.herokuapp.com/api/users/movies/get-all-movies" 
            :"http://localhost:3001/api/users/movies/get-all-movies";
            let payload = await axios.get(url,
                {
                    headers:{
                        authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    },
                }
                )
            setMoviesArray(payload.data.payload)
        }catch(e){
            console.log(e.response);
        };
    };

    async function handleDelete(movieID){
        try{
            let url = process.env.NODE_ENV === "production" 
            ? `https://backend-passport-movie.herokuapp.com/api/users/movies/delete-movie/${movieID}` 
            :`http://localhost:3001/api/users/movies/delete-movie/${movieID}`;
            let payload = await axios.delete(
                url,
                {
                    headers:{
                        authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    },
                }
                )

                let newFavoriteMovie = [...moviesArray];
                let filteredMovieArray = newFavoriteMovie.filter(
                    (item) => item._id !== payload.data.payload._id
                );

                setMoviesArray(filteredMovieArray);
        }catch(e){
            console.log(e.response);
        }
    }
    console.log(moviesArray)
    return(
        <div className="movie-div">
        <div style={{marginLeft: "30%"}}>
        {loading ? <Loading/>:(
            <div>
                <h1 style={{color: "white",marginLeft: -50}}>My Favorites Movie List</h1><br/>
            {moviesArray.map((item)=>{
                        return (
                            <div key={item._id} style={{width:300,height:600,marginRight:25,}}>
                                <Link 
                                style={{
                                    textDecoration:"none", 
                                    color: "white", 
                                    fontFamily: "monospace"}} 
                                    to={{pathname:`/movie-detail/${item.title}`,
                                    search:`?t=${item.title}`}}>
                                        <div>
                                            <img src={item.moviePoster} alt={item.title}/>
                                        </div>
                                        <div>
                                            Title: {item.title}<br/>
                                            Owner: {item._id}
                                        </div>
                                </Link>
                                <br/>
                                <button onClick={()=> handleDelete(item._id)}>Delete</button>
                            </div>
                        );
                    })};
            </div>
        )}                    
        </div>
                </div>
    );
};

export default Favorites

