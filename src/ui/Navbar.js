import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Playlist from '@material-ui/icons/PlaylistPlay';
import Search from '@material-ui/icons/Search';
import './Navbar.scss';

const React = require('react');

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

  playlistRow = ({ playlist_id, name }) => {
    return (
      <ListItem
        className="drawer-list-item"
        selected={this.state.targetPlaylist === playlist_id}
        onClick={() =>
          !this.state.drawerOpened && playlist_id !== 'Search'
            ? this.toggleDrawer()
            : this.onPlaylistClick(playlist_id)
        }
      >
        <ListItemIcon>
          {playlist_id === 'Search' ? <Search /> : <Playlist />}
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
          {playlists && playlists.map(this.playlistRow)}
        </List>
      </Drawer>
    );
  }
}
