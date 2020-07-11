import * as React from 'react';
import * as CallApi from '../utils/APICalls';

export default class PlaylistCreator extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  createPlaylist = () => {
    CallApi.createPlaylist(
      `Playlist${this.props.playlists.length}`,
      this.props.userId
    )
      .then(res => {
        this.props.updateAllPlaylists(this.props.userId);
        this.setState({ currentTab: res });
      })
      .catch(err => err);
    alert('create a new playlist');
  };

  render() {
    return <div>Working In Progress Put Create Playlist logic here</div>;
  }
}
