import React, { Component } from 'react';
import DataTable from './ui/DataTable';
// import Input from './ui/Input';
// import Button from './ui/SubmitButton';
import './App.css';
import Navbar from './ui/Navbar';
import Searchbar from './ui/Searchbar';

// process.env.REACT_APP_ENDPOINT = https://ancient-ceiling-278919.ue.r.appspot.com
const API = process.env.REACT_APP_ENDPOINT || 'http://localhost:8080';

const headings = ['Name', 'Duration', 'Artist', 'Actions'];

let rows = [];
let searchRows = [];
let search = [];

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
    fetch(`${API}/playlist/list/${userId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ availablePlaylists: res });
      })
      .catch(err => err);
  };

  onSubmit = () => {
    console.log('props');
    this.fetchPlaylist();
    this.forceUpdate();
  };

  onClickSearch = text => {
    fetch(`${API}/song/${text}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ searchResponse: res });
      })
      .catch(err => err);
  };

  dataTableButtonClick = (id, isSearch) => {
    if (isSearch) {
      this.callAPIAddSongs([id]);
    } else {
      this.callAPIDeleteSongs([id]);
    }
  };

  callAPIAddSongs = songIds => {
    /**
     * fetch('http://localhost:8080/playlist1', {method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, body: JSON.stringify({artist: 'Mili', title: 'sustain++;', year: 2020})})
     * 
     */
    const playlistId = '8092bcc7-37ee-4114-bc5e-eac125b3bb9b';
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
    rows = [];
    searchRows = [];

    this.state.playlistResponse.forEach(entry => {
      rows.push([
        entry.song_id,
        entry.song_name,
        entry.video_duration,
        entry.artist_name,
      ]);
    });

    this.state.searchResponse.forEach(entry => {
      searchRows.push([
        entry.song_id,
        entry.song_name,
        entry.video_duration,
        entry.artist_name,
      ]);
    });

    return (
      <div className="master-screen">
        <div className="navbar-container">
          <Navbar
            playlists={search.concat(this.state.availablePlaylists)}
            getPlaylist={this.callAPIGetPlaylist}
          ></Navbar>
        </div>
        <div className="song-container">
          <Searchbar
            onSubmit={
              this.state.currentPlaylist === 'Search'
                ? this.onClickSearch
                : () => {
                    console.log('filter playlist contents maybe?');
                  }
              /*this.filterPlaylist ? maybe?*/
            }
          />
          {this.state.currentPlaylist === 'Search' && (
            <div className="search-results-container">
              <DataTable
                headings={headings}
                rows={searchRows}
                isSearch={true}
                onClick={this.dataTableButtonClick}
              />
            </div>
          )}
          {this.state.currentPlaylist !== 'Search' && (
            <div className="playlist-container">
              <DataTable
                headings={headings}
                rows={rows}
                isSearch={false}
                onClick={this.dataTableButtonClick}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
