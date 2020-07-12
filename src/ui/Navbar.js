import React from 'react';
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

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: Constants.TabNames.SEARCH,
      drawerOpened: true,
      popoverAnchor: null,
    };
    this.popoverAnchorEl = React.createRef();
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

  onCreatePlaylistClick = () => {
    // TODO:
    // open a creation modal to prompt user for a playlist name
    // this.setState({ currentTab: Constants.TabNames.CREATEPL });
    this.setState({ currentTab: 'CreatePlaylist' });
    this.props.setTab(Constants.TabNames.CREATEPL);
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
    alert('logout current user');
  };

  playlistRow = ({ playlist_id, name }) => {
    return (
      <ListItem
        key={`drawer-${playlist_id}`}
        className="drawer-list-item"
        button
        selected={this.state.currentTab === playlist_id}
        onClick={() =>
          !this.state.drawerOpened
            ? this.toggleDrawer()
            : this.onPlaylistClick(playlist_id)
        }
      >
        <ListItemIcon>{<PlaylistPlay />}</ListItemIcon>
        {name}
        {this.state.currentTab === playlist_id && this.state.drawerOpened && (
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

  searchRow = () => {
    return (
      <ListItem
        key={`drawer-search`}
        className="drawer-list-item"
        button
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
        button
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
                deletePlaylist(this.state.currentTab).then(() => {
                  this.props.updateAllPlaylists();
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
