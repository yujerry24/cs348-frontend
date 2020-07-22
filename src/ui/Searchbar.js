import React from 'react';
import { Button, TextField, Toolbar } from '@material-ui/core';
import './Searchbar.scss';
import { connect } from 'react-redux';

class Searchbar extends React.Component {
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
    const { availablePlaylists, playingPlaylist, playingSong } = this.props;
    let currentMusic;
    let playlist = availablePlaylists.find(
      p => p.playlist_id === playingPlaylist
    );

    if (playingPlaylist && playlist) {
      currentMusic = playlist.name;
    } else if (playingSong) {
      currentMusic = playingSong;
    }
    return (
      <div className="search-bar-container">
        <Toolbar className="search-toolbar">
          <div className="search-component">
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
          </div>
          {currentMusic
            ? `Currently playing ${
                playingPlaylist ? 'playlist' : 'song'
              }: ${currentMusic}`
            : `No music selected`}
        </Toolbar>
      </div>
    );
  }
}

export default connect(state => ({
  availablePlaylists: state.allPlaylists.playlists,
  playingPlaylist: state.mainApp.playingPlaylist,
  playingSong: state.mainApp.playingSong,
}))(Searchbar);
