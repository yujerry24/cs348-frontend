import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from './ui/DataTable';
import PlaylistCreator from './ui/PlaylistCreator';
import GeneralSearch from './ui/GeneralSearch';
// import Input from './ui/Input';
// import Button from './ui/SubmitButton';
import './App.scss';
import Login from './ui/Login';
import Navbar from './ui/Navbar';
import Searchbar from './ui/Searchbar';
import Video from './ui/VideoDrawer';

import * as CallApi from './utils/APICalls';
import * as Constants from './utils/Constants';
import { fetchAllPlaylists, fetchPlaylist } from './store/fetchCalls';

const headings = ['Name', 'Artists', 'Album', 'Duration', 'Actions'];
const topArtistsHeading = ['Artist Name', 'In Number Of Playlists'];

class App extends Component {
  constructor() {
    super();
    this.state = {
      mostPopSongsResponse: [],
      mostPopArtistsResponse: [],
    };
  }

  componentDidUpdate = prevProps => {
    if (
      prevProps.allPlaylists.length === 0 &&
      this.props.allPlaylists.length > 0
    ) {
      this.props.allPlaylists.forEach(({ playlist_id }) =>
        this.props.fetchPlaylist(playlist_id, this.props.userId)
      );
    } else if (prevProps.userId !== this.props.userId) {
      this.props.fetchAllPlaylists(this.props.userId);
    }
  };

  fetchMostPopularSongs = () => {
    CallApi.fetchMostPopularSongs(this.props.userId)
      .then(res => {
        this.setState({ mostPopSongsResponse: res });
      })
      .catch(err => err);
  };

  fetchMostPopularArtists = () => {
    CallApi.fetchMostPopularArtists()
      .then(res => {
        this.setState({ mostPopArtistsResponse: res });
      })
      .catch(err => err);
  };

  renderInnerContainer = () => {
    if (this.props.currentTab === Constants.TabNames.SEARCH) {
      return (
        <GeneralSearch />
        // <DataTable
        //   headings={headings}
        //   rows={this.state.searchResponse}
        //   isSearch={true}
        // />
      );
    } else if (this.props.currentTab === Constants.TabNames.CREATEPL) {
      return <PlaylistCreator />;
    } else if (this.props.currentTab === Constants.TabNames.TOPSONGS) {
      return (
        <DataTable
          headings={headings}
          rows={this.state.mostPopSongsResponse}
          fetchMostPopularSongs={this.fetchMostPopularSongs}
        />
      );
    } else if (this.props.currentTab === Constants.TabNames.TOPARTISTS) {
      return (
        <DataTable
          headings={topArtistsHeading}
          rows={this.state.mostPopArtistsResponse}
        />
      );
    } else {
      // Playlist tab selected
      return <DataTable headings={headings} isPlaylist />;
    }
  };

  render() {
    return (
      <div className="master-screen">
        {!this.props.validLogin ? (
          <Login />
        ) : (
          <>
            <Navbar
              fetchMostPopularSongs={this.fetchMostPopularSongs}
              fetchMostPopularArtists={this.fetchMostPopularArtists}
            />
            <div className="song-container">
              <Searchbar />
              <div className="search-results-container">
                {this.renderInnerContainer()}
              </div>
            </div>
            <Video 
              topSongs={this.state.mostPopSongsResponse}
              searchResults={this.state.searchResponse}
            />
          </>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    allPlaylists: state.allPlaylists.playlists,
    ...state.mainApp,
  }),
  {
    fetchAllPlaylists,
    fetchPlaylist,
  }
)(App);
