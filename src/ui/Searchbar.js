import React from 'react';
import { AppBar, Toolbar, InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import './Searchbar.scss';
import { connect } from 'react-redux';
import { setSearchText } from '../store/actions';
import {
  fetchSongSearch,
  fetchArtistSearch,
  fetchAlbumSearch,
  fetchPlaylistSearch,
} from '../store/fetchCalls';
import { TabNames } from '../utils/Constants';
import { setCurrentTab } from '../store/actions';

class Searchbar extends React.Component {
  handleChange = e => {
    this.props.setSearchText(e.target.value);
    if (e.target.value !== '') {
      this.props.fetchSongSearch(this.props.userId, e.target.value, 4);
      this.props.fetchArtistSearch(e.target.value, 4);
      this.props.fetchAlbumSearch(e.target.value, 4);
      this.props.fetchPlaylistSearch(e.target.value, 4);
    }
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.props.setSearchText(e.target.value);
    }
  };

  onClick = () => {
    this.props.setCurrentTab(TabNames.SEARCH);
  };

  render() {
    const { availablePlaylists, playingPlaylist, playingSong } = this.props;
    let currentMusic;
    let playlist = availablePlaylists.find(
      p => p.playlist_id === playingPlaylist
    );

    if (playingPlaylist && playlist) {
      currentMusic = playlist.name;
    } else if (playingPlaylist === TabNames.TOPSONGS) {
      currentMusic = 'Top 20 Songs';
    } else if (playingPlaylist === TabNames.SEARCH) {
      currentMusic = 'Search Results';
    } else if (playingSong) {
      currentMusic = playingSong;
    }
    return (
      <div className="search-bar-container">
        <AppBar className="search-appbar" color="inherit" position="static">
          <Toolbar className="search-toolbar">
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
                    onClick={this.onClick}
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
    userId: state.mainApp.userId,
  }),
  {
    setCurrentTab,
    setSearchText,
    fetchSongSearch,
    fetchArtistSearch,
    fetchAlbumSearch,
    fetchPlaylistSearch,
  }
)(Searchbar);
