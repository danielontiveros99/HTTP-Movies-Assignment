import React, { useEffect, useState, } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom"; // import useHistory
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  //update movie fn
  const updateMovie = () => {
    push(`/update-movies/${params.id}`)
  };

  //delete movie fn 
  const deleteMovie = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(() => {
      setMovieList(movieList.filter(item => item.id !== movie.id))
      push('/') //push to the main movie page
    })
    .catch(err => err.message, 'Error in DELETE axios call in Movie.js')
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information... or movie was deleted</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className='update-button' onClick={updateMovie}>
        Update Movie
      </div>

      <div className='delete-button' onClick={deleteMovie}>
        Delete Movie
      </div>

    </div>
  );
}

export default Movie;
