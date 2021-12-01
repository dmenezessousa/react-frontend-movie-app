import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

function MovieHooks() {
    const [movieInput, setmovieInput] = useState("");
    const [movieArray, setMovieArray] = useState([]);
    const{REACT_APP_MOVIE_TOKEN}=process.env
    const [submit, setSubmit] = useState(false);
    const { search } = useLocation();

    const navigate = useNavigate();
    function getRandomMovie() {
        let randomMoviesArray = [
        "superman",
        "terminator",
        "the lord of the rings",
        "harry potter",
        "highlander",
        "predator",
        ];

        let randomIndex = Math.floor(Math.random() * randomMoviesArray.length);

        return randomMoviesArray[randomIndex];
    }

    async function getMovie(movieTitle) {
        //window.history.pushState("", "", `/protected-home?s=${movieTitle}`);
        navigate(`/protected-home?s=${movieTitle}`, {
        replace: true,
        });
        try {
        let payload = await axios.get(
            `http://omdbapi.com/?apikey=${REACT_APP_MOVIE_TOKEN}&s=${movieTitle}`
        );

        let movieIdArray = payload.data.Search.map((item) => item.imdbID);

        let promiseMovieArray = movieIdArray.map(async (item) => {
            return await axios.get(`http://omdbapi.com/?apikey=${REACT_APP_MOVIE_TOKEN}&i=${item}`);
        });
        //[<Promise>, <Promise>]

        Promise.all(promiseMovieArray)
            .then((result) => {
            setMovieArray(result);
            })
            .catch((e) => {
            console.log(e);
            });
        } catch (e) {}
    }

    useEffect(() => {
        if (submit) {
        setSubmit(false);
        getMovie(movieInput);
        }
    }, [submit]);

    useEffect(() => {
        const values = queryString.parse(search);
        if (values.s) {
        getMovie(values.s);
        } else {
        getMovie(getRandomMovie());
        }
    }, []);

    return [movieInput, setmovieInput, movieArray, setSubmit];
}

export default MovieHooks;