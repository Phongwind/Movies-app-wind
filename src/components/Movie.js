import React from 'react'
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import star from './star.png';


export default function Movie(props) {

    let htmlMovie = props.movieList.map((movie) => {
        return (
            <Card style={{ width: '50rem', backgroundColor: '#171717', borderRadius: '20px', marginBottom: '2%', marginTop: '2%' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-4" style={{marginTop: '2%', marginBottom: '2%'}}>
                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} />
                        </div>
                        <div className="col-8">
                            <Card.Body>
                                <Card.Title style={{ fontWeight: 'bold', fontSize: 30, color: 'white' }}>{movie.title}</Card.Title>
                                <span style={{ fontWeight: 'bold', fontSize: 30, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <img src={star} /> {movie.vote_average}
                                </span>

                                
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <div style={{ backgroundColor: 'white', height: '2px', marginLeft: '4%', marginRight: '5%' }}></div>
                                <ListGroupItem style={{ fontSize: 12, backgroundColor: '#171717', color: 'white', paddingRight: '3%' }}>{movie.overview}</ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                <Button className="btn btn-lg" onClick={movie.video} style={{ marginBottom: 15, marginRight: '3%', backgroundColor: '#E6B91E', borderRadius: '50px', border: 'none', color: 'black' }}>
                                    View Trailer
                                </Button>
                                <Button className="btn btn-lg" onClick={movie.video} style={{ marginBottom: 15, marginRight: '1%', backgroundColor: '#E6B91E', borderRadius: '50px', border: 'none', color: 'black' }}>
                                    See more
                                </Button>
                                </div>
                            </Card.Body>
                        </div>
                    </div>
                </div>

            </Card>

        )
    })
    return (
        <div className="row">
            {htmlMovie}
        </div>
    )
}

