import React from 'react';
import { Button, TextField, Toolbar } from '@material-ui/core';
import './Searchbar.scss';

export default class Searchbar extends React.Component {
  constructor() {
    super();
    this.state = { searchText: '' };
  }

  handleChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleKeyUp = e => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      this.props.onSubmit(this.state.searchText);
    }
  };

  render() {
    return (
      <div className="search-bar-container">
        <Toolbar>
          <TextField
            id="standard-basic"
            label="Search"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.onSubmit(this.state.searchText)}
          >
            Search
          </Button>
        </Toolbar>
      </div>
    );
  }
}
