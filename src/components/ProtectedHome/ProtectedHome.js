import React from "react";
import { Link } from "react-router-dom";
import MovieHooks from "../common/MovieHooks";
import axios from "axios";
import "./Movie.css";

function ProtectedHome() {
    let [, setmovieInput, movieArray, setSubmit] = MovieHooks();

    async function handleAddToFavorite(movieDetail){
        try{
            let url = process.env.NODE.ENV === "production" 
            ? "https://backend-passport-movie.herokuapp.com/api/users/movies/add-movie" 
            :`http://localhost:3001/api/users/movies/add-movie`;
            await axios.post(
                url,
                {
                    title: movieDetail.Title,
                    moviePoster: movieDetail.Poster,
                    imdbID: movieDetail.imdbID,
                    movieOwner:""
                },
                {
                    headers:{
                        authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`,
                    },
                }
            );
        }catch(e){
        }
    };

    function handleMovieSubmit() {
        setSubmit(true);
    };

    return (
        <div>
        ProtectedHome
        <div>
            <input onChange={(e) => setmovieInput(e.target.value)} />
            <button onClick={handleMovieSubmit}>Submit</button>
        </div>
        <div className="movie-div">
                    {movieArray.map((item)=>{
                        return (
                            <div key={item.data.imdbID} style={{width:300,height:600,marginRight:25,}}>
                                <Link 
                                style={{
                                    textDecoration:"none", 
                                    color: "white", 
                                    fontFamily: "monospace"}} 
                                    to={{pathname:`/movie-detail/${item.data.Title}`,
                                    search:`?t=${item.data.Title}`}}>
                                        <div>
                                            <img src={item.data.Poster} alt={item.data.Title}/>
                                        </div>
                                        <div>
                                            Title: {item.data.Title}<br/>
                                            Year:{item.data.Year}
                                        </div>
                                </Link>
                                <button onClick={()=> handleAddToFavorite(item.data)}>ADD to Favorites</button>
                            </div>
                        );
                    })};
                </div>
        </div>
    );
}

export default ProtectedHome;
