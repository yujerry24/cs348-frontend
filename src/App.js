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

class App extends Component {
  constructor() {
    super();
    // Consider caching search responses?
    this.state = {
      searchResponse: [],
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
    } else {
      // Playlist tab selected
      return <DataTable headings={headings} isSearch={false} />;
    }
  };

  render() {
    return (
      <div className="master-screen">
        <Navbar />
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
