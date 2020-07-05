import { Divider, Drawer, List, ListItem } from '@material-ui/core';
import './Navbar.scss';

const React = require('react');

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetPlaylist: 'Search',
    };
    this.playlistRow = this.playlistRow.bind(this);
    this.onPlaylistClick = this.onPlaylistClick.bind(this);
  }

  onPlaylistClick(playlistId) {
    this.setState({ targetPlaylist: playlistId });
    this.props.getPlaylist(playlistId);
  }

  playlistRow = ({ playlist_id, name }) => {
    return (
      <ListItem
        className={`playlist-div`}
        selected={this.state.targetPlaylist === playlist_id}
        onClick={() => this.onPlaylistClick(playlist_id)}
      >
        {name}
      </ListItem>
    );
  };

  render() {
    const { playlists } = this.props;

    return (
      <Drawer variant="permanent" className="drawer">
        <List>
          {this.playlistRow({ playlist_id: 'Search', name: 'Search' })}
          <Divider />
          {playlists && playlists.map(this.playlistRow)}
        </List>
      </Drawer>
    );
  }
}
