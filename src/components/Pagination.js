import React from "react";
import { Button } from "react-bootstrap";

export default class Pagination extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayOfPages: []
    };
  }
  updatePagination = event => {
    this.props.parentMethod(event); //gets the id, to indicate to the parent what page to go to
    // currentNum gets us the next page number
  };
  setButtons = () => {
    let array = [];
    let upperLimit = 5 * Math.ceil(this.props.page / 5);
    let base = upperLimit - 4;
    if (upperLimit > this.props.totalPages) upperLimit = this.props.totalPages;
    if (base > this.props.totalPages) upperLimit = base;
    console.log(upperLimit);
    for (let x = base; x <= upperLimit; x++) {
      array.push(x);
    }
    return array;
  };

  componentDidMount() {
    this.setState({ arrayOfPages: this.setButtons() });
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log(this.state.page, this.state.arrayOfPages[4], nextProps.page);
    // this.setState({ page: this.props.page });
    if (
      nextProps.page > this.state.arrayOfPages[4] ||
      nextProps.page < this.state.arrayOfPages[0]
    ) {
      this.setState({
        arrayOfPages: this.setButtons()
      });
    }
    // this.setButtons();
  }
  //this.props.pages & totalPages
  render() {
    return (
      <div
        id="pagination-id"
        className="row bg-dark w-100 m-0 p-3"
        style={{ height: "150px" }}
      >
        <div className="col-md-6"></div>
        <div className="col-md-6">
          
          <div className="d-flex w-100 bg-dark pr-3 m-auto">
            
            <Button
              className={`${
                this.props.page <= 1 ? "myHidden" : ""
              } pagination-buttons flex-grow-1`}
              onClick={this.updatePagination}
              value="previous"
            >
              Prev
            </Button>
            {this.state.arrayOfPages.length !== 0 &&
              this.state.arrayOfPages.map((item, index) => {
                if (this.props.totalPages === 1 && index > 0) return "";
                else
                  return (
                    <Button
                      className={`${
                        item === this.props.page
                          ? "border-light text-dark"
                          : ""
                      } pagination-buttons flex-grow-1`}
                      size="lg"
                      onClick={this.updatePagination}
                      value={item} style={{backgroundColor: '#E6B91E'}}
                    >
                      {item}
                    </Button>
                  );
              })}
            <Button
              className={`${
                this.props.page >= this.props.totalPages ? "myHidden" : ""
              } .pagination-buttons flex-grow-1`}
              onClick={this.updatePagination}
              value="next"
            >
              Next
            </Button>
            
          </div>
        </div>
      </div>
    );
  }
}
