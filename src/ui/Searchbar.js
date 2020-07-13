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

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.props.onSearch(this.state.searchText);
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
            onKeyDown={this.handleKeyDown}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.onSearch(this.state.searchText)}
          >
            Search
          </Button>
        </Toolbar>
      </div>
    );
  }
}
