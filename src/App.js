import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataTable from './ui/DataTable';
import PlaylistCreator from './ui/PlaylistCreator';
// import Input from './ui/Input';
// import Button from './ui/SubmitButton';
import './App.css';
import Navbar from './ui/Navbar';
import Searchbar from './ui/Searchbar';
import Video from './ui/Video';

import * as CallApi from './utils/APICalls';
import * as Constants from './utils/Constants';
import { fetchAllPlaylists, fetchPlaylist } from './store/fetchCalls';

const headings = ['Name', 'Artists', 'Album', 'Duration', 'Actions'];
const topArtistsHeading = ['Artist Name', 'In Number Of Playlists'];

class App extends Component {
  constructor() {
    super();
    // Consider caching search responses?
    this.state = {
      searchResponse: [],
      mostPopSongsResponse: [],
      mostPopArtistsResponse: [],
    };
  }

  componentWillMount = () => {
    this.props.fetchAllPlaylists(this.props.userId);
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.allPlaylists.length === 0 &&
      this.props.allPlaylists.length > 0
    ) {
      this.props.allPlaylists.forEach(({ playlist_id }) =>
        this.props.fetchPlaylist(playlist_id)
      );
    }
  };

  fetchMostPopularSongs = () => {
    CallApi.fetchMostPopularSongs()
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

  onClickSearch = text => {
    CallApi.search(text)
      .then(res => {
        this.setState({ searchResponse: res });
      })
      .catch(err => err);
  };

  renderInnerContainer = () => {
    if (this.props.currentTab === Constants.TabNames.SEARCH) {
      return (
        <DataTable
          headings={headings}
          rows={this.state.searchResponse}
          isSearch={true}
        />
      );
    } else if (this.props.currentTab === Constants.TabNames.CREATEPL) {
      return <PlaylistCreator />;
    } else if (this.state.currentTab === Constants.TabNames.TOPSONGS) {
      return (
        <DataTable
          headings={headings}
          rows={this.state.mostPopSongsResponse}
          isSearch={false}
          onClick={this.dataTableButtonClick}
          availablePlaylists={this.state.availablePlaylists}
        />
      );
    } else if (this.state.currentTab === Constants.TabNames.TOPARTISTS) {
      return (
        <DataTable
          headings={topArtistsHeading}
          rows={this.state.mostPopArtistsResponse}
          isSearch={false}
          onClick={this.dataTableButtonClick}
          availablePlaylists={this.state.availablePlaylists}
        />
      );
    } else {
      // Playlist tab selected
      return <DataTable headings={headings} isSearch={false} />;
    }
  };

  render() {
    return (
      <div className="master-screen">
        <Navbar
          fetchMostPopularSongs={this.fetchMostPopularSongs}
          fetchMostPopularArtists={this.fetchMostPopularArtists}
        />
        <div className="song-container">
          <Searchbar
            onSearch={
              this.props.currentTab === Constants.TabNames.SEARCH
                ? this.onClickSearch
                : () => {
                    alert('filter playlist contents maybe?');
                  }
              /*this.filterPlaylist ? maybe?*/
            }
          />
          <div className="search-results-container">
            {this.renderInnerContainer()}
          </div>
        </div>
        <div className="video">
          <Video videoId={'-9fC6oDFl5k'} /* Time of our life: -9fC6oDFl5k */ />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    allPlaylists: state.allPlaylists.playlists,
    currentTab: state.mainApp.currentTab,
    userId: '63e439ec-8625-4912-8b03-e34d5a7cfaee',
  }),
  {
    fetchAllPlaylists: userId => fetchAllPlaylists(userId),
    fetchPlaylist: playlistId => fetchPlaylist(playlistId),
  }
)(App);
