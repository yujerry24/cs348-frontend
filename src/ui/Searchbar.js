import React from 'react';
import { AppBar, Toolbar, InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import './Searchbar.scss';
import { connect } from 'react-redux';
import { setSearchText } from '../store/actions'
import { fetchMiniSongSearch, fetchMiniArtistSearch, fetchMiniAlbumSearch, fetchMiniPlaylistSearch } from '../store/fetchCalls'

class Searchbar extends React.Component {
  handleChange = e => {
    this.props.setSearchText(e.target.value);
    if (this.props.searchText !== "") {
      this.props.fetchMiniSongSearch(this.props.searchText);
      this.props.fetchMiniArtistSearch(this.props.searchText);
      this.props.fetchMiniAlbumSearch(this.props.searchText);
      this.props.fetchMiniPlaylistSearch(this.props.searchText);
    }
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
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
        <AppBar className="search-appbar" color='inherit' position="static">
          <Toolbar boxShadow={1} className="search-toolbar">
            <div className="search-component">
              <div className="search-box">
                <div className="search-icon">
                  <Search />
                </div>
                <div className="search-input">
                  <InputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="controls">
              {currentMusic
                ? `Currently playing ${
                    playingPlaylist ? 'playlist' : 'song'
                  }: ${currentMusic}`
                : `No music selected`}
              </div>
            </div>
          </Toolbar>
        </AppBar>
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
