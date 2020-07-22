import React from 'react';
import { Button, TextField, Toolbar } from '@material-ui/core';
import './Searchbar.scss';
import { connect } from 'react-redux';
import { setSearchText } from '../store/actions'
import { fetchMiniSongSearch, fetchMiniArtistSearch, fetchMiniAlbumSearch, fetchMiniPlaylistSearch } from '../store/fetchCalls'

class Searchbar extends React.Component {
  handleChange = e => {
    // this.setState({ searchText: e.target.value });
    this.props.setSearchText(e.target.value);
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      // this.props.onSearch(this.state.searchText);
      this.props.setSearchText(e.target.value);
    }
  };

  onClick = () => {
    if (this.props.searchText !== "") {
      this.props.fetchMiniSongSearch(this.props.searchText);
      this.props.fetchMiniArtistSearch(this.props.searchText);
      this.props.fetchMiniAlbumSearch(this.props.searchText);
      this.props.fetchMiniPlaylistSearch(this.props.searchText);
    }
  }

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
              onClick={() => this.onClick()}
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

export default connect(
  state => ({
    availablePlaylists: state.allPlaylists.playlists,
    playingPlaylist: state.mainApp.playingPlaylist,
    playingSong: state.mainApp.playingSong,
    searchText: state.mainApp.searchText,
  }),
  {
    setSearchText,
    fetchMiniSongSearch: searchText => fetchMiniSongSearch(searchText),
    fetchMiniArtistSearch: searchText => fetchMiniArtistSearch(searchText),
    fetchMiniAlbumSearch: searchText => fetchMiniAlbumSearch(searchText),
    fetchMiniPlaylistSearch: searchText => fetchMiniPlaylistSearch(searchText), 
  }
)(Searchbar);
