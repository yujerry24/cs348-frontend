import React from 'react';
import { connect } from 'react-redux';

import { Drawer, IconButton } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

import { TabNames } from '../utils/Constants';

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
    const {
      playingPlaylist,
      playingSong,
      playlistsById,
      searchSongs,
      subSongs,
      topSongs,
    } = this.props;
    if (playingPlaylist && playingSong) {
      let songs;
      if (playingPlaylist === TabNames.SEARCH) {
        songs = searchSongs;
      } else if (playingPlaylist === TabNames.TOPSONGS) {
        songs = topSongs;
      } else if (playlistsById[playingPlaylist]) {
        songs = playlistsById[playingPlaylist].songsById;
      } else {
        songs = subSongs;
      }
      let vidIds = songs
        ? Object.values(songs).map(song => song.video_id)
        : ['0'];
      let startSong =
        songs && songs[playingSong] ? songs[playingSong].video_id : '0';

      while (vidIds.includes(startSong) && vidIds[0] !== startSong) {
        let front = vidIds.shift(1);
        vidIds.push(front);
      }
      return vidIds;
    } else {
      // if playingSong exists
      // call api for video id using song id)
      return ['0'];
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
  searchSongs: state.songSearch.songs,
  subSongs: state.mainApp.subSongs,
}))(VideoDrawer);
