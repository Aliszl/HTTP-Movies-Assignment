import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };
  // deleteMovie = (id) => {
  //   axios.delete(`http://localhost:5000/api/movies/${id}`)
  //     .then(response => {
  //       setCurrentMovieId(""); // very prudent
  //       // getAllQuotes(); perhaps we don't need to refetch
  //       setMovies(movies.filter(movie => movie.id !== id));
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  editMovie = (id, updatedMovie)=>{
    axios.put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
.then(res=> console.log(res))
.catch(error => {
         console.error(error);
     })
}
//   putRequestUpdateMovie = (e, id) => {
//     const upDateMovie = {
//       id: id,
//       title: e.target.title,
//       director: e.target.director
//     };
//     axios
//       .put(`http://localhost:5000/api/movies/${id}`, upDateMovie)
//       .then()
//       .catch(error => {
//         console.log(error);
//       });
//   };
  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="delete-button" onClick={this.deleteMovie}>
          delete
        </div>
    
        <div className="edit-button" onClick={this.editMovie}>
       edit
     </div>
      </div>
      
    );
  }
}
