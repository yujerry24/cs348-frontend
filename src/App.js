import React, { Component } from 'react';
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

const headings = ['Name', 'Artists', 'Album', 'Duration', 'Actions'];

class App extends Component {
  constructor() {
    super();
    // Consider caching responses somehow?
    this.state = {
      playlistResponse: [],
      searchResponse: [],
      availablePlaylists: [],
      currentTab: Constants.TabNames.SEARCH,
      userId: '63e439ec-8625-4912-8b03-e34d5a7cfaee',
    };
  }

  componentWillMount = () => {
    this.fetchAllPlaylists(this.state.userId); // Timothy
  };

  fetchAllPlaylists = () => {
    CallApi.fetchAllPlaylists(this.state.userId)
      .then(res => {
        this.setState({ availablePlaylists: res });
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

  dataTableButtonClick = (ids, playlistIds, isSearch) => {
    if (isSearch) {
      // prompt user for which playlist(s) to add to
      CallApi.addSongs(ids, playlistIds);
    } else {
      // I don't think we need to call requery when we know what got deleted
      CallApi.deleteSongs(ids, this.state.currentTab).then(() => {
        this.updatePlaylist(this.state.currentTab);
      });
    }
  };

  updatePlaylist = playlistId => {
    CallApi.fetchPlaylist(playlistId)
      .then(res => {
        this.setState({ playlistResponse: res });
      })
      .catch(err => err);
  };

  setTab = tab => {
    this.setState({ currentTab: tab });
  };

  renderInnerContainer = () => {
    if (this.state.currentTab === Constants.TabNames.SEARCH) {
      return (
        <DataTable
          headings={headings}
          rows={this.state.searchResponse}
          isSearch={true}
          onClick={this.dataTableButtonClick}
          availablePlaylists={this.state.availablePlaylists}
        />
      );
    } else if (this.state.currentTab === 'CreatePlaylist') {
      return <PlaylistCreator />;
    } else {
      // Playlist tab selected
      return (
        <DataTable
          headings={headings}
          rows={this.state.playlistResponse}
          isSearch={false}
          onClick={this.dataTableButtonClick}
          availablePlaylists={this.state.availablePlaylists}
        />
      );
    }
  };

  render() {
    return (
      <div className="master-screen">
        <Navbar
          playlists={this.state.availablePlaylists}
          setTab={this.setTab}
          updatePlaylist={this.updatePlaylist}
          updateAllPlaylists={this.fetchAllPlaylists}
        />
        <div className="song-container">
          <Searchbar
            onSearch={
              this.state.currentTab === Constants.TabNames.SEARCH
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

export default App;
