import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListSubheader,
  Popover,
} from '@material-ui/core';
import {
  AccountCircle,
  Add,
  ChevronLeft,
  ChevronRight,
  Delete,
  PlaylistPlay,
  Search,
} from '@material-ui/icons';
import './Navbar.scss';
import * as Constants from '../utils/Constants';
import { deletePlaylist } from '../utils/APICalls';

import { fetchAllPlaylists } from '../store/fetchCalls';
import { setUser, setCurrentTab, setValidLogin } from '../store/actions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: true,
      popoverAnchor: null,
    };
    this.popoverAnchorEl = React.createRef();
  }

  toggleDrawer = () => {
    this.setState({ drawerOpened: !this.state.drawerOpened });
  };

  onPlaylistClick = playlistId => {
    this.props.setCurrentTab(playlistId);
  };

  onSearchClick = () => {
    this.props.setCurrentTab(Constants.TabNames.SEARCH);
  };

  onMostPopSongsClick = () => {
    this.props.setCurrentTab(Constants.TabNames.TOPSONGS);
    this.props.fetchMostPopularSongs();
  };

  onMostPopArtistsClick = () => {
    this.props.setCurrentTab(Constants.TabNames.TOPARTISTS);
    this.props.fetchMostPopularArtists();
  };

  onCreatePlaylistClick = () => {
    // TODO:
    // open a creation modal to prompt user for a playlist name
    // this.setState({ currentTab: Constants.TabNames.CREATEPL });
    this.props.setCurrentTab(Constants.TabNames.CREATEPL);
  };

  onDeletePlaylistClick = () => {
    this.setState({
      deletePopoverOpen: true,
      popoverAnchor: this.popoverAnchorEl.current,
    });
  };

  onLogout = () => {
    // TODO:
    // open a creation modal??
    // call api
    // alert('logout current user');
    this.props.setValidLogin(false);
    this.props.setUser('');
  };

  playlistRow = ({ playlist_id, name }) => {
    const { currentTab } = this.props;
    return (
      <ListItem
        key={`drawer-${playlist_id}`}
        className="drawer-list-item"
        button
        selected={currentTab === playlist_id}
        onClick={() =>
          !this.state.drawerOpened
            ? this.toggleDrawer()
            : this.onPlaylistClick(playlist_id)
        }
      >
        <ListItemIcon>{<PlaylistPlay />}</ListItemIcon>
        {name}
        {currentTab === playlist_id && this.state.drawerOpened && (
          <ListItemSecondaryAction>
            <IconButton
              size="small"
              edge="end"
              aria-label="delete"
              onClick={this.onDeletePlaylistClick}
              ref={this.popoverAnchorEl}
            >
              <Delete fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  };

  topSongs = () => {
    return (
      <ListItem
        key={`drawer-top-songs`}
        className="drawer-list-item"
        selected={this.props.currentTab === Constants.TabNames.TOPSONGS}
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
        selected={this.props.currentTab === Constants.TabNames.TOPARTISTS}
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
        button
        selected={this.props.currentTab === Constants.TabNames.SEARCH}
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
        button
        selected={this.props.currentTab === Constants.TabNames.CREATEPL}
        onClick={this.onCreatePlaylistClick}
      >
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        {'Create Playlist'}
      </ListItem>
    );
  };

  renderPopover = () => {
    const open = Boolean(this.state.popoverAnchor);
    const id = open ? 'delete-playlist-popover' : undefined;
    return (
      <Popover
        id={id}
        open={open}
        anchorEl={this.state.popoverAnchor}
        onClose={() => {
          this.setState({ popoverAnchor: null });
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className="popover-container">
          {'Are you sure you want to delete this playlist?'}
          <div className="popover-buttons">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                this.setState({ popoverAnchor: null });
              }}
            >
              No
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                deletePlaylist(this.props.currentTab).then(() => {
                  this.props.fetchAllPlaylists(this.props.userId);
                  this.props.setCurrentTab(Constants.TabNames.SEARCH);
                });
                this.setState({ popoverAnchor: null });
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </Popover>
    );
  };

  render() {
    const { allPlaylists } = this.props;

    return (
      <Drawer
        variant="permanent"
        className={this.state.drawerOpened ? 'drawerOpen' : 'drawerClosed'}
        classes={{ paper: 'paper' }}
      >
        <List className="list">
          <div className="drawer-header">
            <IconButton className="drawer-toggle" onClick={this.toggleDrawer}>
              {this.state.drawerOpened ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </div>
          <Divider />
          {this.searchRow()}
          <Divider />
          {this.state.drawerOpened && (
            <ListSubheader>{'Most Popular'}</ListSubheader>
          )}
          {this.topSongs()}
          {this.topArtists()}
          <Divider />
          <div className="playlist-items-container">
            {this.state.drawerOpened && (
              <ListSubheader>{'Playlists'}</ListSubheader>
            )}
            {allPlaylists && allPlaylists.map(this.playlistRow)}
          </div>
          <Divider />
          {this.state.drawerOpened && (
            <ListSubheader>{'Other Actions'}</ListSubheader>
          )}
          {this.createPlaylistRow()}
          <ListItem
            key="drawer-logout"
            className="drawer-list-item"
            button
            onClick={this.onLogout}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            {'Logout'}
          </ListItem>
        </List>
        {this.renderPopover()}
      </Drawer>
    );
  }
}

export default connect(
  state => ({
    allPlaylists: state.allPlaylists.playlists,
    currentTab: state.mainApp.currentTab,
    userId: state.mainApp.userId,
  }),
  {
    setUser,
    setCurrentTab,
    setValidLogin,
    fetchAllPlaylists: userId => fetchAllPlaylists(userId),
  }
)(Navbar);
