import React, { useState, useEffect } from 'react';
import axios from 'axios';


const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [''],
  };

  export const UpdateMovie = props =>{
      const [movie, setMovie] = useState(initialMovie);
      console.log(props.movies)
      useEffect(() => {
          const movieToEdit = props.movies.find(
              movie => `${movie.id}` === props.match.params.id
          );
          if (movieToEdit) setMovie(movieToEdit);
      }, [props.match.params.id, props.movies])

      const handleChanges = event => {
          event.persist();
          let value = event.target.value;
          if (event.target.name === 'metascore') {
              value = parseInt(value, 10)
          }

          setMovie({
              ...movie,
              [event.target.name]: value
          });
      };

      const handleSubmit = event => {
          event.preventDefault();
          axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
          .then(result => {
              const newMovies=props.movies.map(movie => (
                `${movie.id}` === props.match.params.id
              ))
              console.log(result)
              props.updateMovies(newMovies);
              window.location.reload();
          })
          .catch(error => console.log(error.response));
      };

      return (
        <div>
          <h2>Update Movie</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              onChange={handleChanges}
              placeholder="Title"
              value={movie.title}
            />
            <div/>
    
            <input
              type="text"
              name="director"
              onChange={handleChanges}
              placeholder="Director"
              value={movie.director}
            />
            <div/>
    
            <input
              type="number"
              name="metascore"
              onChange={handleChanges}
              placeholder="Metascore"
              value={movie.metascore}
            />
            <div/>
    
            <input
              type="string"
              name="stars"
              onChange={handleChanges}
              placeholder="Stars"
              value={movie.stars}
            />
            {/* <NavLink to='/'> */}
                <button>Update</button>
            {/* </NavLink> */}
          </form>
        </div>
      );
  }