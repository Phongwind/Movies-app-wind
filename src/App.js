import React, { useEffect, useState, Component } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Movie from './components/Movie'
import NavBar from './components/NavBar';
import GenreList from "./components/GenreList";

// let apiKey = process.env.REACT_APP_APIKEY;

let apiKey = "aac8f83781435d0aaf1c687240833101";






function App() {

  let [movies, setMovies] = useState(null);
  let CurrentPlaying = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    let data = await fetch(url)
    let dataResult = await data.json();
    console.log("data we get", dataResult);
    setMovies(dataResult.results);

  }
  useEffect(CurrentPlaying, []);
  if (movies == null) {
    return (
      <div>
        loading the movie
      </div>
    )
  }
  return (
    <div style={{ backgroundColor: '#0D0D0D' }}>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2" style={{ backgroundColor: '#171717' }}>
            
          </div>

          <div className="col-7" style={{ marginTop: '5%' }}>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2" style={{color: 'white'}}>Now Playing</h1>
              <div className="btn-toolbar mb-2 mb-md-0">


                <button className="btn btn-sm btn-outline-warning" style={{borderRadius: '40px'}}>Most popular</button>


              </div>
            </div>
            <Movie movieList={movies} />
          </div>

          <div className="col-3" style={{ backgroundColor: '#171717' }}>

          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
