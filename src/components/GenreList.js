import React from 'react'
import {
    Button,
} from 'react-bootstrap'


class GenreList extends React.Component {
    onFilterForGenre = genreId => {
        const filteredMovies = this.props.allMovies.filter(movie => movie.genre_ids.includes(genreId))
        this.props.updateForGenres(filteredMovies)
    }

    getGenreCount(id) {
        const allMovies = this.props.allMovies.filter(({ genre_ids }) => genre_ids.includes(id))
        return allMovies.length
    }

    render() {
        return (
            this.props.genres.map(({ name, id, }) => {
                if (this.getGenreCount(id) === 0) return null
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <Button
                                    onClick={() => this.onFilterForGenre(id)}
                                    style={{
                                        fontSize: 12,
                                        width: '30%',
                                        marginTop: 10,
                                        fontWeight: 'bold',
                                        backgorund: 'none',
                                        border: 'none'
                                    }}>

                                    {name}
                                </Button>
                            </div>
                            <div className="col-2" style={{ fontSize: 12 }}>
                                {this.getGenreCount(id)}
                            </div>
                        </div>

                    </div>

                )
            })
        )
    }
}

export default GenreList


