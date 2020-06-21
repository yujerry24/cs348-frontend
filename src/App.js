import React, { Component } from 'react';
import DataTable from './ui/DataTable';
// import Input from './ui/Input';
// import Button from './ui/SubmitButton';
import './App.css';
import Navbar from './ui/Navbar';
import Searchbar from './ui/Searchbar';

// process.env.ENDPOINT = https://ancient-ceiling-278919.ue.r.appspot.com
const API = process.env.ENDPOINT || 'http://localhost:8080';

const headings = [
  'Id',
  'Name',
  'Duration',
  'Artist'
];

let rows = [];
let searchRows = [];
let search = [{playlist_id: 'Search', name: 'Search'}];

class App extends Component {
  constructor(){
    super();
    this.state = {
      playlistResponse: [],
      searchResponse: [],
      availablePlaylists: [],
      currentPlaylist: 'Search'
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.callAPIGetPlaylist = this.callAPIGetPlaylist.bind(this);
    this.callAPIAddSong = this.callAPIAddSong.bind(this);
    this.callAPIDeleteSong = this.callAPIDeleteSong.bind(this);
    this.dataTableButtonClick = this.dataTableButtonClick.bind(this);
  }

  componentWillMount = () => {
    const userId = '63e439ec-8625-4912-8b03-e34d5a7cfaee'; // Timothy
    fetch(`${API}/playlist/list/${userId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({availablePlaylists: res});
      })
      .catch(err => err);
  }

  onSubmit() {
    console.log('props');
    this.callAPI();
    this.forceUpdate();
  }

  onClickSearch(text){
    fetch(`${API}/song/${text}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);

        this.setState({searchResponse: res});
      })
      .catch(err => err);

  }

  dataTableButtonClick(id, isSearch){
    if (isSearch){
      this.callAPIAddSong(id);
    } else {
      this.callAPIDeleteSong(id);
    }
  }

  callAPIAddSong(songId){
    /**
     * fetch('http://localhost:8080/playlist1', {method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, body: JSON.stringify({artist: 'Mili', title: 'sustain++;', year: 2020})})
     * 
     */
    console.log(songId)

    const playlistId = '8092bcc7-37ee-4114-bc5e-eac125b3bb9b';
    fetch(`${API}/playlist/${playlistId}/${songId}`, {
      method: 'POST'
    });
  }

  callAPIDeleteSong(songId){
    fetch(`${API}/playlist/${this.state.currentPlaylist}/${songId}`, {
      method: 'DELETE', 
      // headers: {
      //   'Content-Type': 'application/json;charset=utf-8'
      // }, 
    }).then(() => {
      this.callAPI(this.state.currentPlaylist)
    });
  }

  callAPI(playlistId){
    fetch(`${API}/playlist/${playlistId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({playlistResponse: res});
      })
      .catch(err => err);
  }

  callAPIGetPlaylist(playlistId){
    console.log("getting playlist", playlistId);
    this.setState({currentPlaylist: playlistId});
    this.callAPI(playlistId);
  }

  render() {
    rows = [];
    searchRows = [];

    this.state.playlistResponse.forEach(entry => {
      rows.push([entry.song_id, entry.song_name, entry.video_duration, entry.artist_name]);
    });
    
    this.state.searchResponse.forEach(entry => {
      searchRows.push([entry.song_id, entry.song_name, entry.video_duration, entry.artist_name]);
    });

    return (
      <div className='master-screen'>
        <div className='navbar-container'>
          <Navbar playlists={search.concat(this.state.availablePlaylists)} getPlaylist={this.callAPIGetPlaylist}></Navbar>
        </div>
        <div className = 'song-container'>
          <Searchbar 
            onSubmit={
              this.state.currentPlaylist === 'Search' 
              ? this.onClickSearch 
              : ()=>{console.log('filter playlist contents maybe?')} 
              /*this.filterPlaylist ? maybe?*/ 
              }/>
          {this.state.currentPlaylist === 'Search' && 
            <div className='search-results-container'>
              <DataTable headings={headings} rows={searchRows} isSearch={true} onClick={this.dataTableButtonClick}/>
            </div>
          }
          {this.state.currentPlaylist !== 'Search' && 
            <div className='playlist-container'>
              <DataTable headings={headings} rows={rows} isSearch={false} onClick={this.dataTableButtonClick}/>
            </div>
          }
        </div>
      </div>    
    );
  }
}

export default App;