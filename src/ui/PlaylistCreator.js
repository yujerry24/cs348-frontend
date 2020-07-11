import * as React from 'react';
import * as CallApi from '../utils/APICalls';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './PlaylistCreator.scss';

export default class PlaylistCreator extends React.Component {
  constructor() {
    super();
    this.state = {playlistText: ''};
  }

  createPlaylist = (playlistName) => {
    CallApi.createPlaylist(
      playlistName,
      this.props.userId
    )
      .then(res => {
        this.props.updateAllPlaylists(this.props.userId);
        this.setState({ currentTab: res });
      })
      .catch(err => err);
    alert('create a new playlist');
  };

  handleChange = e => {
    this.setState({ playlistText: e.target.value });
  };

  handleOnClick = () => {
    if (this.state.playlistText === ''){
      alert('Playlist name must be non-empty');
      return;
    }
    this.createPlaylist(this.state.playlistText);
    this.setState({playlistText: ''});
  };

  render() {
    return (
      <div className='playlist-creator-container'>
        <div className='creator-title'>
          Enter the name of your new playlist
        </div>
        <div className='creator-textfield-container'>
          <div className='creator-text'>
            <TextField 
              id="standard-basic"
              label="Playlist name"
              fullWidth
              onChange={this.handleChange}
              value={this.state.playlistText}
            />
          </div>
          <div className='creator-button'>
            <Button 
              variant="contained" 
              color="primary"
              onClick={this.handleOnClick}
            >
              Create Playlist
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
