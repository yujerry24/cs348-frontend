import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';

import { createPlaylist, addPlaylistsToPlaylist } from '../utils/APICalls';

import { setCurrentTab } from '../store/actions';
import { fetchAllPlaylists, fetchPlaylist } from '../store/fetchCalls';

import './PlaylistCreator.scss';

class PlaylistCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      playlistText: '',
      checked: [],
    };
  }

  callCreatePlaylist = playlistName => {
    createPlaylist(playlistName, this.props.userId)
      .then(res => {
        // res: { playlistId: string }
        this.props.fetchAllPlaylists(this.props.userId);
        this.props.setCurrentTab(res.playlistId);
      })
      .catch(err => err);
    alert('create a new playlist');
  };

  callAddToPlaylist = (playlistName, playlist_ids) => {
    createPlaylist(playlistName, this.props.userId)
      .then(newId => {
        // newId: { playlistId: string }
        this.props.fetchAllPlaylists(this.props.userId);
        addPlaylistsToPlaylist(newId['playlistId'], playlist_ids)
          .then(() => {
            this.props.setCurrentTab(newId['playlistId']);
            this.props.fetchPlaylist(newId['playlistId']);
          })
          .catch(err => err);
      })
      .catch(err => err);
    alert('create a new playlist based on existing');
  };

  handleChange = e => {
    this.setState({ playlistText: e.target.value });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.props.onSearch(this.state.searchText);
    }
  };

  handleOnClick = () => {
    if (this.state.playlistText === '') {
      alert('Playlist name must be non-empty');
      return;
    }
    if (this.state.checked.length > 0) {
      let playlist_ids = [];
      this.state.checked.forEach(playlist => {
        playlist_ids.push(playlist['playlist_id']);
      });
      this.callAddToPlaylist(this.state.playlistText, playlist_ids);
    } else {
      this.callCreatePlaylist(this.state.playlistText);
    }

    this.setState({ playlistText: '' });
  };

  handleToggleAll = () => {
    if (this.numberChecked() === this.props.playlists.length) {
      this.setState({ checked: [] });
    } else {
      this.setState({ checked: this.props.playlists });
    }
  };

  handleToggle = playlist => {
    let newChecked = this.state.checked.slice(0);
    let index = this.state.checked.findIndex(
      pl => pl['name'] === playlist['name'] && pl['id'] === playlist['id']
    );
    if (index !== -1) {
      newChecked.splice(index, 1);
    } else {
      newChecked.push(playlist);
    }
    this.setState({ checked: newChecked });
  };

  numberChecked = () => {
    return this.state.checked.length;
  };

  renderRow = playlist => {
    let id = playlist['playlist_id'];
    let name = playlist['name'];
    return (
      <TableRow key={`row-${id}`}>
        <TableCell
          key={`actions-${id}`}
          align={'left'}
          style={{ padding: 0, minWidth: '90px' }}
        >
          <Checkbox
            checked={
              this.state.checked.findIndex(
                pl => pl['name'] === name && pl['playlist_id'] === id
              ) !== -1
            }
            tabIndex={-1}
            disableRipple
            onClick={() => {
              this.handleToggle(playlist);
            }}
          />
        </TableCell>
        <TableCell key={`cell-${id}-${name}`} align={'left'}>
          {name}
        </TableCell>
      </TableRow>
    );
  };

  renderPlaylistTable = () => {
    const { playlists } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow key={`row-selectAll`}>
            <TableCell
              key={`actions-selectAll`}
              align={'left'}
              style={{ padding: 0, minWidth: '90px' }}
            >
              <Checkbox
                onClick={this.handleToggleAll}
                checked={
                  this.numberChecked() === playlists.length &&
                  playlists.length !== 0
                }
                indeterminate={
                  this.numberChecked() !== playlists.length &&
                  this.numberChecked() !== 0
                }
                disabled={playlists.length === 0}
                inputProps={{ 'aria-label': 'all items selected' }}
              />
            </TableCell>
            <TableCell key={`cell-selectAllName`} align={'left'}>
              {`Playlists (${this.numberChecked()}/${
                playlists.length
              } selected)`}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playlists.length > 0 ? (
            playlists.map(this.renderRow)
          ) : (
            <TableRow>
              <TableCell style={{ textAlign: 'center' }}>
                {'No Playlists Found'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  render() {
    return (
      <div className="playlist-creator-container">
        <div className="creator-title">Create Playlist</div>
        <div className="creator-textfield-container">
          <div className="creator-nameInput">
            <div className="creator-text">
              <TextField
                id="standard-basic"
                label="Playlist name"
                fullWidth
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                value={this.state.playlistText}
              />
            </div>
            <div className="creator-button">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleOnClick}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="creator-playlists">{this.renderPlaylistTable()}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    playlists: state.allPlaylists.playlists,
    userId: state.mainApp.userId,
  }),
  {
    setCurrentTab,
    fetchAllPlaylists: userId => fetchAllPlaylists(userId),
    fetchPlaylist: playlistId => fetchPlaylist(playlistId),
  }
)(PlaylistCreator);
