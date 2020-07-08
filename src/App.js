import React, { Component } from 'react';
import DataTable from './ui/DataTable';
// import Input from './ui/Input';
// import Button from './ui/SubmitButton';
import './App.css';
import Navbar from './ui/Navbar';
import Searchbar from './ui/Searchbar';
import Video from './ui/Video';

// process.env.REACT_APP_ENDPOINT = https://ancient-ceiling-278919.ue.r.appspot.com
const API = process.env.REACT_APP_ENDPOINT || 'http://localhost:8080';

const headings = ['Name', 'Artist', 'Album', 'Duration', 'Actions'];

class App extends Component {
  constructor() {
    super();
    this.state = {
      playlistResponse: [],
      searchResponse: [],
      availablePlaylists: [],
      currentPlaylist: 'Search',
    };
  }

  componentWillMount = () => {
    const userId = '63e439ec-8625-4912-8b03-e34d5a7cfaee'; // Timothy
    this.fetchAllPlaylists(userId);
  };

  fetchAllPlaylists = userId => {
    fetch(`${API}/playlist/list/${userId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ availablePlaylists: res });
      })
      .catch(err => err);
  };

  onClickSearch = text => {
    fetch(`${API}/song/${text}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ searchResponse: res });
      })
      .catch(err => err);
  };

  dataTableButtonClick = (ids, playlistId, isSearch) => {
    if (isSearch) {
      // prompt user for which playlist(s) to add to
      this.callAPIAddSongs(ids, playlistId);
    } else {
      this.callAPIDeleteSongs(ids, playlistId);
    }
  };

  callAPIAddSongs = (songIds, playlistId) => {
    fetch(`${API}/playlist/add/${playlistId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ songIds: songIds }),
    });
  };

  callAPIDeleteSongs = songIds => {
    fetch(`${API}/playlist/${this.state.currentPlaylist}/${songIds}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ songIds: songIds }),
    }).then(() => {
      this.fetchPlaylist(this.state.currentPlaylist);
    });
  };

  fetchPlaylist = playlistId => {
    fetch(`${API}/playlist/${playlistId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ playlistResponse: res });
      })
      .catch(err => err);
  };

  callAPIGetPlaylist = playlistId => {
    console.log('getting playlist', playlistId);
    this.setState({ currentPlaylist: playlistId });
    this.fetchPlaylist(playlistId);
  };

  render() {
    return (
      <div className="master-screen">
        <Navbar
          playlists={this.state.availablePlaylists}
          getPlaylist={this.callAPIGetPlaylist}
          updateAllPlaylists={this.fetchAllPlaylists}
          userId={'63e439ec-8625-4912-8b03-e34d5a7cfaee'}
        />
        <div className="song-container">
          <Searchbar
            onSearch={
              this.state.currentPlaylist === 'Search'
                ? this.onClickSearch
                : () => {
                    alert('filter playlist contents maybe?');
                  }
              /*this.filterPlaylist ? maybe?*/
            }
          />
          <div className="search-results-container">
            {this.state.currentPlaylist === 'Search' && (
              <DataTable
                headings={headings}
                rows={this.state.searchResponse}
                isSearch={true}
                onClick={this.dataTableButtonClick}
                availablePlaylists={this.state.availablePlaylists}
              />
            )}
            {this.state.currentPlaylist !== 'Search' && (
              <DataTable
                headings={headings}
                rows={this.state.playlistResponse}
                isSearch={false}
                onClick={this.dataTableButtonClick}
              />
            )}
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
