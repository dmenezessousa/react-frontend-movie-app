import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";

function MovieDetail() {
    const [movieList, setMovieList] = useState([]);
    const {name} = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(()=> setLoading(false),500)
    },[]);

    useEffect(() => {
        getMoviesInfo();
    },[]);
    async function getMoviesInfo(){
        try{
            let payload = await axios.get(
                `https://omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_TOKEN}&t=${name}`
            );
            setMovieList(payload.data); 
            console.log(movieList);
            }catch(e){
                console.log(e);
            };
        };

    return (
        <div>
            {loading ? <Loading/>:(
                <div style={{color: "white"}}>
                <div style={{marginTop: 30}}>
                <img src={movieList.Poster} alt={movieList.Title} />
                </div>
                <div style={{marginLeft: 20, marginTop: 25}}>
                <table>
                    <tbody>
                        <tr>
                            <td>Title: </td>
                            <td>{movieList.Title}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td>Actors: </td>
                            <td>{movieList.Actors}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td>Awards: </td>
                            <td>{movieList.Awards}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td>Country: </td>
                            <td>{movieList.Country}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td>Plot: </td>
                            <td>{movieList.Plot}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <td>Rated: </td>
                            <td>{movieList.Rated}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    Ratings:{" "}
                {movieList.Ratings.map((item) => {
                    return (
                        <span key={item.Source}>
                            <div>
                            {item.Source}
                            </div>
                            <div>
                            {item.Value}
                            </div>                            
                        </span>
                );
                })}
            </div>
            </div>
        </div>
            )}
        </div>
    );
};

export default MovieDetail;
