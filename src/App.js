import React, { Component } from 'react';
import DataTable from './ui/DataTable';
// import Input from './ui/Input';
// import Button from './ui/SubmitButton';
import './App.css';
import Navbar from './ui/Navbar';
import Searchbar from './ui/Searchbar';

const headings = [
  'Artist',
  'Title',
  'Year'
];

let rows = [];
let searchRows = [];

let userPlaylists = ['Search', 'Playlist-1'];

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
    this.callAPIGetPlaylists = this.callAPIGetPlaylists.bind(this);
    this.callAPIAddSong = this.callAPIAddSong.bind(this);
    this.callAPIDeleteSong = this.callAPIDeleteSong.bind(this);
    this.dataTableButtonClick = this.dataTableButtonClick.bind(this);
  }

  onSubmit() {
    console.log('props');
    this.callAPI();
    this.forceUpdate();
  }

  onClickSearch(text){
    // fetch('https://ancient-ceiling-278919.ue.r.appspot.com/playlist1')
    fetch(`http://localhost:8080/song/${text}`)
      .then(res => res.json())
      .then(res => {
        this.setState({searchResponse: res});
      })
      .catch(err => err);

  }

  dataTableButtonClick(index, isSearch){
    if (isSearch){
      this.callAPIAddSong(index);
    } else {
      this.callAPIDeleteSong(index);
    }
  }

  callAPIAddSong(index){
    /**
     * fetch('http://localhost:8080/playlist1', {method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, body: JSON.stringify({artist: 'Mili', title: 'sustain++;', year: 2020})})
     * 
     */
    const {searchResponse} = this.state;
    fetch('http://localhost:8080/playlist1', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, 
      body: JSON.stringify({artist: searchResponse[index].artist, title: searchResponse[index].title, year: searchResponse[index].year})}
    );

    this.callAPI();
  }

  callAPIDeleteSong(index){
    const {playlistResponse} = this.state;
    // console.log(playlistResponse);
    fetch('http://localhost:8080/playlist1', {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, 
      body: JSON.stringify({artist: playlistResponse[index].artist, title: playlistResponse[index].title})}
    ).then(() => {
      this.callAPI()
    });
  }

  callAPI(){
    // fetch('https://ancient-ceiling-278919.ue.r.appspot.com/playlist1')
    fetch('http://localhost:8080/playlist1')
      .then(res => res.json())
      .then(res => {
        this.setState({playlistResponse: res});
      })
      .catch(err => err);
  }

  callAPIGetPlaylists(playlistId){
    console.log("getting playlist", playlistId);
    this.setState({currentPlaylist: playlistId});
    this.callAPI();
    // fetch('http://localhost:8080//playlist/list/:userId')
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({availablePlaylists: res});
    //   })
    //   .catch(err => err);
  }

  render() {
    rows = [];
    searchRows = [];

    this.state.playlistResponse.forEach(entry => {
      rows.push([entry.artist, entry.title, entry.year]);
    });
    
    this.state.searchResponse.forEach(entry => {
      searchRows.push([entry.artist, entry.title, entry.year]);
    });

    return (
      <div className='master-screen'>
        <div className='navbar-container'>
          <Navbar playlists={userPlaylists} getPlaylist={this.callAPIGetPlaylists}></Navbar>
        </div>
        <div className = 'song-container'>
          <Searchbar onSubmit={this.onClickSearch}/>
          {this.state.currentPlaylist === 'Search' && <div className='search-results-container'>
              <DataTable headings={headings} rows={searchRows} isSearch={true} onClick={this.dataTableButtonClick}/>
          </div>}
          {this.state.currentPlaylist !== 'Search' && <div className='playlist-container'>
            <div>
              <DataTable headings={headings} rows={rows} isSearch={false} onClick={this.dataTableButtonClick}/>
            </div>
          </div>}
        </div>
      </div>    
    );
  }
}

export default App;