import React from "react";
import { Nav, Form, Button, Navbar, FormControl } from "react-bootstrap";
import logo from './logo.png';
import search from './search.png';
import movie from './movie.png';
import video from './video.png';
import event from './Event.png';
import celebs from './Celebs.png';
import TV from './TV-show.png';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }

  filterMovies = e => {
    this.setState({ search: e.target.value })
    this.props.onSearchMovies(this.state.search)
  };

  render() {
    return (
      <Navbar expand="lg" style={{backgroundColor: '#343333'}}>
        <Navbar.Brand href="#home"><img src={logo} alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{display: 'flex', alignItems: 'center'}}>
            <Nav.Link href="#home" style={{marginRight: '5%'}}><img src={movie} alt="icon" /></Nav.Link>
            <Nav.Link href="#link" style={{marginRight: '5%'}}><img src={TV} alt="icon" /></Nav.Link>
            <Nav.Link href="#link" style={{marginRight: '5%'}}><img src={event} alt="icon" /></Nav.Link>
            <Nav.Link href="#link" style={{marginRight: '5%'}}><img src={celebs} alt="icon" /></Nav.Link>
            <Nav.Link href="#link" style={{marginRight: '5%'}}><img src={video} alt="icon" /></Nav.Link>
            
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              className="mr-sm-2"
              placeholder="Search"
              value={this.state.search}
              onChange={e => this.filterMovies(e)}
              style={{borderRadius: '40px', border: 'none'}}
            />
            <Button
              variant="outline-secondary"
              onClick={() => this.props.onSearchMovies(this.state.search)}
              style={{border: 'none', width: '50px'}}
            >
              <img src={search} alt="Logo" />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
