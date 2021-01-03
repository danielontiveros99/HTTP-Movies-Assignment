import React, { useState, useEffect, Fragment } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
//import Update Movie component
import UpdateMovieForm from './Movies/UpdateMovieForm';

const App = () => {
  const [savedList, setSavedList] = useState([]); //savedList
  const [movieList, setMovieList] = useState([]);//movie List
  const [refresh, setRefresh] = useState(true); // Refresh

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response))
      .finally(() => {
        setRefresh(false)
      })
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [refresh]); //add refresh depedency

  return (
    <Fragment>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} movieList={movieList} setMovieList={setMovieList}/>
      </Route>

      <Route path='/update-movies/:id'>
        <UpdateMovieForm setMovieList={setMovieList} getMovieList={getMovieList} setRefresh={setRefresh} />
      </Route>
    </Fragment>
  );
};

export default App;
