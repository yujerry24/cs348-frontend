import React, { Component } from 'react';
import DataTable from './ui/DataTable';
import Input from './ui/Input';
import Button from './ui/SubmitButton';
import './App.css';
import Navbar from './ui/Navbar';
import Searchbar from './ui/Searchbar';

const headings = [
  'Artist',
  'Title',
  'Year'
];

let rows = [];

let userPlaylists = ['Search', 'Playlist-1', 'Playlist-2'];

class App extends Component {
  constructor(){
    super();
    this.state = {
      apiResponse: [],
      availablePlaylists: [],
      currentPlaylist: 'Search'
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.callAPIGetPlaylists = this.callAPIGetPlaylists.bind(this);
  }

  onSubmit() {
    console.log('props');
    this.callAPI();
    this.forceUpdate();
  }

  onClickSearch(text){
    // fetch('https://ancient-ceiling-278919.ue.r.appspot.com/playlist1')
    fetch(`http://localhost:8080/song/songName/${text}`)
      .then(res => res.json())
      .then(res => {
        this.setState({apiResponse: res});
      })
      .catch(err => err);

  }

  callAPI(){
    // fetch('https://ancient-ceiling-278919.ue.r.appspot.com/playlist1')
    fetch('http://localhost:8080/playlist1')
      .then(res => res.json())
      .then(res => {
        this.setState({apiResponse: res});
      })
      .catch(err => err);
  }

  callAPIGetPlaylists(playlistId){
    console.log("getting playlist", playlistId);
    this.setState({currentPlaylist: playlistId});
    // fetch('http://localhost:8080//playlist/list/:userId')
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({availablePlaylists: res});
    //   })
    //   .catch(err => err);
  }

  render() {
    rows = [];
    this.state.apiResponse.forEach(entry => {
      rows.push([entry.artist, entry.title, entry.year]);
    });

    return (
      <div className='master-screen'>
        <div className='navbar-container'>
          <Navbar playlists={userPlaylists} getPlaylist={this.callAPIGetPlaylists}></Navbar>
        </div>
        <div className = 'song-container'>
          <Searchbar onSubmit={this.onClickSearch}/>
          {/* <Input/> */}

          {this.state.currentPlaylist !== 'Search' && <div className='playlist-container'>
            <div className='button'>
              <Button onSubmit={this.onSubmit}/>
            </div>
            <div>
              <DataTable headings={headings} rows={rows} />
            </div>
          </div>}
        </div>
      </div>    
    );
  }
}

export default App;