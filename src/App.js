import React from "react";
import {
  Button,
} from "react-bootstrap";
import ReactModal from 'react-modal'
import YouTube from '@u-wave/react-youtube';


import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import Movie from "./components/Movie";
import Pagination from "react-js-pagination";

import "./App.css";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      movies: [],
      genres: [],
      pageNumber: 1,
      allMovies: [],
      showModal: false,
      activePage: 1
    };
  }


  async componentDidMount() {

    this.getGenres();
    this.getMovies();
  }

  async getGenres() {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=aac8f83781435d0aaf1c687240833101&language=en-US"
    );
    const { genres } = await response.json();
    this.setState({ genres });
  }



  getMovies = async () => {
    const { pageNumber } = this.state;
    let apiKey = "aac8f83781435d0aaf1c687240833101";
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&${pageNumber}`

    );
    const data = await response.json();
    const movies = data.results;
    const newMovies = this.state.movies.concat(movies);

    this.setState({
      movies: newMovies,
      allMovies: newMovies,
      pageNumber: pageNumber + 1
    });
  };



  onSortMostToLeastPopular = () => {
    let { allMovies } = this.state;
    allMovies = allMovies.sort((a, b) => b.popularity - a.popularity);

    this.setState({
      movies: allMovies
    });
  };

  onResetGenres = () => this.setState({ movies: this.state.allMovies });

  onSearchMovies = search => {
    console.log('onSearchMovies')
    const { allMovies } = this.state;
    const filteredMovies = allMovies.filter(
      ({ title, overview }) =>
        title.includes(search) || overview.includes(search)
    );
    this.setState({
      movies: filteredMovies
    });
  };

  onPageClick = async e => {
    const id = e.target.id;
    const { movies } = this.state;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4c5b4a5e627748117d4b24082672a9b4&page=${id}`
    );
    const data = await response.json();
    this.setState({ movies: movies.concat(data.results), pageNumber: id });
  };

  getTotalMoviesCount() {
    return this.state.allMovies.length || this.state.movies.length;
  }

  renderGenreSelectionButtons() {
    const { genres, allMovies } = this.state;
    return (
      <GenreList
        genres={genres}
        allMovies={allMovies}
        updateForGenres={filteredMovies =>
          this.setState({ movies: filteredMovies })
        }
      />
    );
  }

  renderToolbar() {
    return (

      <Button
        onClick={this.onSortMostToLeastPopular}
        style={{
          border: 'none',
          background: 'none'
        }}
      >
        Most Popular
      </Button>


    );
  }

  renderMovieListData() {
    const { allMovies, movies } = this.state;

    if (allMovies.length > movies.length) {
      return (
        <Button
          onClick={this.onResetGenres}
          variant="warning"
          style={{
            height: 40,
            fontSize: 20,
            marginTop: 30,
            width: "100%",
            marginBottom: 15,
            fontWeight: "bold",
          }}
        >
          See All {this.getTotalMoviesCount()}
        </Button>
      );
    }
    return (
      <div className="container">
        <div className="row" style={{ display: 'flex', alignItems: 'center', marginTop: 30, borderBottom: '1px solid white' }}>
          <div className="col-10" style={{ color: 'white', fontSize: 20 }}>
            ALL
          </div>
          <div className="col-2" style={{ fontSize: 12, color: 'white' }}>
            {this.getTotalMoviesCount()}
          </div>
        </div>

      </div>

    );
  }



  onClickMovie = async movieId => {
    console.log('movieId', movieId)
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=4c5b4a5e627748117d4b24082672a9b4`
    );
    const { results } = await response.json();

    if (results.length > 0) {
      var item = results[Math.floor(Math.random() * results.length)];
      this.setState({ focusedMovieCode: item.key, showModal: true });
    }
  };


  renderMovieItem = movie => {
    const { genres } = this.state; 

    let openModal = (movieId) => {
      this.setState({ showModal: true })
    }
    return (
      <Movie
        {...movie}
        movie={movie}
        genres={genres}
        onClickMovie={this.onClickMovie}
        openModal={openModal}
      />
    );
  };

  renderMovies() {
    const { movies } = this.state;
    return movies.map(this.renderMovieItem);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  };





  render() {

    return (
      <div style={{ backgroundColor: '#0D0D0D' }}>
        <NavBar onSearchMovies={this.onSearchMovies} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2" >

              {this.renderMovieListData()}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                {this.renderGenreSelectionButtons()}
              </div>
            </div>

            <div className="col-7" style={{ marginTop: '5%' }}>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2" style={{ color: 'white' }}>Now Playing</h1>
                <div className="btn-toolbar mb-2 mb-md-0">


                  <button className="btn btn-sm btn-outline-warning" style={{ borderRadius: '40px' }}>{this.renderToolbar()}</button>


                </div>
              </div>
              {this.renderMovies()}
              <div
                style={{
                  paddingTop: 10,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                {/* <Button
                  onClick={this.getMovies}
                  variant="warning"

                >
                  Get More
              </Button> */}

                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={450}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                  itemClass="page-item"
                  linkClass="page-link"
                />
                {/* {this.renderPaginationBar()} */}
              </div>
            </div>

            <div className="col-3" style={{ backgroundColor: '#171717' }}>

            </div>

          </div>
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          style={{ overlay: {}, content: {} }}
          onRequestClose={() => this.setState({ showModal: false })}
        ><YouTube
            video={this.state.focusedMovieCode} //i don't know how to get the right value here. Why is it a string??
            autoplay
            className="video"
          />
        </ReactModal>
      </div>

    );
  }
}

export default App;


