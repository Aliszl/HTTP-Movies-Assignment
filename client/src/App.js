import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdatedMovie from "./Movies/UpdatedMovie"

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [currentMovieId, setCurrentMovieId] = useState(null);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const MovieAction = movie => {
    setCurrentMovieId([...currentMovieId, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
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
