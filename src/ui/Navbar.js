import React from 'react';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
} from '@material-ui/core';
import {
  AccountCircle,
  Add,
  ChevronLeft,
  ChevronRight,
  PlaylistPlay,
  Search,
} from '@material-ui/icons';
import './Navbar.scss';

const API = process.env.REACT_APP_ENDPOINT || 'http://localhost:8080';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetPlaylist: 'Search',
      drawerOpened: true,
    };
  }

  toggleDrawer = () => {
    this.setState({ drawerOpened: !this.state.drawerOpened });
  };

  onPlaylistClick = playlistId => {
    this.setState({ targetPlaylist: playlistId });
    this.props.getPlaylist(playlistId);
  };

  onCreatePlaylist = () => {
    // TODO:
    // open a creation modal to prompt user for a playlist name
    fetch(`${API}/playlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        playlistName: `Playlist${this.props.playlists.length}`,
        userId: this.props.userId,
      }),
    })
      .then(res => res.json())
      .then(res => {
        this.props.updateAllPlaylists(this.props.userId);
        this.setState({ targetPlaylist: res });
      })
      .catch(err => err);
    alert('create a new playlist');
  };

  onLogout = () => {
    // TODO:
    // open a creation modal??
    // call api
    alert('logout current user');
  };

  playlistRow = ({ playlist_id, name }) => {
    return (
      <ListItem
        key={`drawer-${playlist_id}`}
        className="drawer-list-item"
        selected={this.state.targetPlaylist === playlist_id}
        onClick={() =>
          !this.state.drawerOpened && playlist_id !== 'Search'
            ? this.toggleDrawer()
            : this.onPlaylistClick(playlist_id)
        }
      >
        <ListItemIcon>
          {playlist_id === 'Search' ? <Search /> : <PlaylistPlay />}
        </ListItemIcon>
        {name}
      </ListItem>
    );
  };

  render() {
    const { playlists } = this.props;

    return (
      <Drawer
        variant="permanent"
        className={this.state.drawerOpened ? 'drawerOpen' : 'drawerClosed'}
        classes={{ paper: 'paper' }}
      >
        <div className="drawer-header">
          <IconButton className="drawer-toggle" onClick={this.toggleDrawer}>
            {this.state.drawerOpened ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {this.playlistRow({ playlist_id: 'Search', name: 'Search' })}
          <Divider />
          {this.state.drawerOpened && (
            <ListSubheader>{'Playlists'}</ListSubheader>
          )}
          {playlists && playlists.map(this.playlistRow)}
          <Divider />
          {this.state.drawerOpened && (
            <ListSubheader>{'Other Actions'}</ListSubheader>
          )}
          <ListItem
            key="drawer-create-playlist"
            className="drawer-list-item"
            onClick={this.onCreatePlaylist}
          >
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            {'Create Playlist'}
          </ListItem>
          <ListItem
            key="drawer-logout"
            className="drawer-list-item"
            onClick={this.onLogout}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            {'Logout'}
          </ListItem>
        </List>
      </Drawer>
    );
  }
}
