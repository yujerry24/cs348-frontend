import React from 'react';
import { connect } from 'react-redux';

import { Drawer, IconButton } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

import * as Constants from '../utils/Constants'

import Video from './Video';
import './VideoDrawer.scss';

class VideoDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      opened: false,
    };
  }

  toggleDrawer = () => {
    this.setState({ 
      opened: !this.state.opened,
     });
  };

  getVideoIds = () => {
    const { playingPlaylist, playingSong, playlistsById, topSongs, searchResults } = this.props;
    if (playingPlaylist && playingSong) {
      let songs;
      if (playingPlaylist === Constants.TabNames.SEARCH) {
        songs = searchResults;
      } else if (playingPlaylist === Constants.TabNames.TOPSONGS) {
        songs = topSongs;
      } else {
        songs = playlistsById[playingPlaylist].songsById;
      }
      let vidIds = Object.values(songs).map(song => song.video_id);
      let startSong = songs[playingSong].video_id;

      while (vidIds[0] !== startSong) {
        let front = vidIds.shift(1);
        vidIds.push(front);
      }
      return vidIds;
    } else {
      // if playingSong exists
      // call api for video id using song id)
      return ['0', '0'];
      // return ['-9fC6oDFl5k', 'WehhSc1knYY'];
      /* Time of our life: -9fC6oDFl5k,  Zombie: WehhSc1knYY*/
    }
  };

  render() {
    return (
      <Drawer
        variant="permanent"
        className={this.state.opened ? 'videoDrawerOpen' : 'videoDrawerClosed'}
        classes={{ paper: 'paper' }}
      >
        <div className="container">
          <IconButton className="drawer-toggle" onClick={this.toggleDrawer}>
            {this.state.opened ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
          <div className="video">
            <Video videoIds={this.getVideoIds()} />
          </div>
        </div>
      </Drawer>
    );
  }
}

export default connect(state => ({
  playingPlaylist: state.mainApp.playingPlaylist,
  playingSong: state.mainApp.playingSong,
  playlistsById: state.playlistsById,
}))(VideoDrawer);
