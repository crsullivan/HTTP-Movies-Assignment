import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import {UpdateMovie} from './Movies/UpdateMovie'
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  }
    // const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies`)
      .then(res => setSavedList(res.data))
      .catch(error => console.log(error));
  }, []);
  ;

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/edit-movie/:id"
        render={props => {
          return <UpdateMovie {...props} movies={savedList} updateMovies={setSavedList} />;
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </>
  );
};

export default App;
