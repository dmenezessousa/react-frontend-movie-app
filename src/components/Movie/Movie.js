import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import "./Movie.css"

function Movie() {
    const [movieList, setMovieList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        fetchMovies();
    },[]);

    async function fetchMovies(){
    try{
        let payload = await axios.get(
            `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_TOKEN}&s=harry-potter`
        );
        setMovieList(payload.data.Search)
    }catch(e){
        console.log(e);
    }
    };


    const handleOnChange = (event) =>{
            setInputValue(event.target.value);
    };

    async function handleOnClick (event){

        try{
            let payload = await axios.get(
                `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_TOKEN}&s=${inputValue}`
            );
            setMovieList(payload.data.Search)
            let movieArray = payload.data.Search.map((item)=>item.imdbID);
            let promiseMoviesArray = movieArray.map(async (item)=>{
                return await axios.get(
                    `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_TOKEN}&s=${item}`
                )
            })
            Promise.all(promiseMoviesArray)
            .then((result)=>{
                console.log(result);
            })
            .catch((e)=>{
                console.log(e);
            })
            
            console.log(movieList);
    }catch(e){
        if(e.response.status === 404){
            setError(e.response.data.Error)
        }
        console.log(e);
    }
    };

    function addToFavoritesMovie(){

    }
    
    return (
            <div style={{backgroundColor: "#252525"}}>
                <div 
                style={{
                    width: 500,
                    margin: "0 auto",
                    textAlign: "center",
                    marginTop: 100
                }}>
                <input 
                type="text"
                placeholder="Search Movie"
                name="movie"
                onChange={handleOnChange}
                value={inputValue}
                />
                <button onClick={handleOnClick}>Search</button>
                <div>{error && error}</div>
                </div>
                <div className="movie-div">
                    {movieList.map((item)=>{
                        return (
                            <div key={item.imdbID} style={{width:300,height:600,marginRight:25,}}>
                                <Link 
                                style={{
                                    textDecoration:"none", 
                                    color: "white", 
                                    fontFamily: "monospace"}} 
                                    to={{pathname:`/movie-detail/${item.Title}`,
                                    search:`?t=${item.Title}`}}>
                                        <div>
                                            <img src={item.Poster} alt={item.Title}/>
                                        </div>
                                        <div>
                                            Title: {item.Title}<br/>
                                            Year:{item.Year}
                                        </div>
                                        console.log(movielist);
                                </Link>
                                <button onClick={addToFavoritesMovie}>ADD to Favorites</button>
                            </div>
                        );
                    })};
                </div>
            </div>
        );
};

export default Movie;
