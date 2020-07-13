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
import * as Constants from '../utils/Constants';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: Constants.TabNames.SEARCH,
      drawerOpened: true,
    };
  }

  toggleDrawer = () => {
    this.setState({ drawerOpened: !this.state.drawerOpened });
  };

  onPlaylistClick = playlistId => {
    this.setState({ currentTab: playlistId });
    // TODO: probably should cache playlist results
    this.props.updatePlaylist(playlistId);
    this.props.setTab(playlistId);
  };

  onSearchClick = () => {
    this.setState({ currentTab: Constants.TabNames.SEARCH });
    this.props.setTab(Constants.TabNames.SEARCH);
  };

  onMostPopSongsClick = () => {
    this.setState({ currentTab: Constants.TabNames.TOPSONGS });
    this.props.fetchMostPopularSongs();
    this.props.setTab(Constants.TabNames.TOPSONGS);
  };

  onMostPopArtistsClick = () => {
    this.setState({ currentTab: Constants.TabNames.TOPARTISTS });
    this.props.fetchMostPopularArtists();
    this.props.setTab(Constants.TabNames.TOPARTISTS);
  }

  onCreatePlaylistClick = () => {
    // TODO:
    // open a creation modal to prompt user for a playlist name
    // this.setState({ currentTab: Constants.TabNames.CREATEPL });
    this.setState({ currentTab: 'CreatePlaylist' });
    this.props.setTab(Constants.TabNames.CREATEPL);
  };

  onLogout = () => {
    // TODO:
    // open a creation modal??
    // call api
    // alert('logout current user');
    this.props.setValidLogin(false);
  };

  playlistRow = ({ playlist_id, name }) => {
    return (
      <ListItem
        key={`drawer-${playlist_id}`}
        className="drawer-list-item"
        selected={this.state.currentTab === playlist_id}
        onClick={() =>
          !this.state.drawerOpened
            ? this.toggleDrawer()
            : this.onPlaylistClick(playlist_id)
        }
      >
        <ListItemIcon>{<PlaylistPlay />}</ListItemIcon>
        {name}
      </ListItem>
    );
  };

  topSongs = () => {
    return (
      <ListItem
        key={`drawer-top-songs`}
        className="drawer-list-item"
        selected={this.state.currentTab === Constants.TabNames.TOPSONGS}
        onClick={() =>
          !this.state.drawerOpened
            ? this.toggleDrawer()
            : this.onMostPopSongsClick()
        }
      >
        <ListItemIcon>{<PlaylistPlay />}</ListItemIcon>
        {'Top 20 Songs'}
      </ListItem>
    );
  };

  topArtists = () => {
    return (
      <ListItem
        key={`drawer-top-artists`}
        className="drawer-list-item"
        selected={this.state.currentTab === Constants.TabNames.TOPARTISTS}
        onClick={() =>
          !this.state.drawerOpened
            ? this.toggleDrawer()
            : this.onMostPopArtistsClick()
        }
      >
        <ListItemIcon>{<PlaylistPlay />}</ListItemIcon>
        {'Top 20 Artists'}
      </ListItem>
    );
  };

  searchRow = () => {
    return (
      <ListItem
        key={`drawer-search`}
        className="drawer-list-item"
        selected={this.state.currentTab === Constants.TabNames.SEARCH}
        onClick={() =>
          !this.state.drawerOpened ? this.toggleDrawer() : this.onSearchClick()
        }
      >
        <ListItemIcon>
          <Search />
        </ListItemIcon>
        {'Search'}
      </ListItem>
    );
  };

  createPlaylistRow = () => {
    return (
      <ListItem
        key="drawer-create-playlist"
        className="drawer-list-item"
        selected={this.state.currentTab === Constants.TabNames.CREATEPL}
        onClick={this.onCreatePlaylistClick}
      >
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        {'Create Playlist'}
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
          {this.searchRow()}
          <Divider />
          {this.state.drawerOpened && (
            <ListSubheader>{'Most Popular'}</ListSubheader>
          )}
          {this.topSongs()}
          {this.topArtists()}
          <Divider />
          {this.state.drawerOpened && (
            <ListSubheader>{'Playlists'}</ListSubheader>
          )}
          {playlists && playlists.map(this.playlistRow)}
          <Divider />
          {this.state.drawerOpened && (
            <ListSubheader>{'Other Actions'}</ListSubheader>
          )}
          {this.createPlaylistRow()}
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
