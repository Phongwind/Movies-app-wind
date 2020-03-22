import React ,{useEffect,useState}from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Movie from './components/Movie'
import NavBar from './components/NavBar';

// let apiKey = process.env.REACT_APP_APIKEY;

let apiKey = "aac8f83781435d0aaf1c687240833101";

function App() {

  let [movies,setMovies] = useState(null);
  let CurrentPlaying =async() =>{
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    let data = await fetch(url)
    let dataResult = await data.json();
    console.log("data we get",dataResult);
    setMovies(dataResult.results);

  }
  useEffect(CurrentPlaying,[]);
  if(movies == null){
    return(
      <div>
        loading the movie 
      </div>
    )
  }
  return (
    <div style={{backgroundColor: '#0D0D0D'}}>
        <NavBar/>
       <Movie movieList = {movies}/>
    </div>
  );
}

export default App;
