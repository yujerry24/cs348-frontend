import * as React from 'react';
import { connect } from 'react-redux';

import {
  Paper
} from '@material-ui/core';

import './GeneralSearch.scss';


class GeneralSearch extends React.Component {
  constructor() {
    super();
    // this.state = {

    // };
  }

  miniResults = (results) => {
    return (
      <Paper variant="outline">
        <div>
          {!results || results.length === 0 ?
          <div>"No results found"</div>
          :
          <div>"Results found!</div>
          }
        </div>
      </Paper>
    )
  }

  render() {
    return (
      <div className="gsearch">
        <div className="gsearch-row">
            <div className="gsearch-song">
              SONG
              {this.miniResults()}
            </div>
            <div className="gsearch-artist">
              ARTIST
              {this.miniResults()}  
            </div>
        </div>
        <div className="gsearch-row">
            <div className="gsearch-album">
              ALBUM
              {this.miniResults()}
            </div>
            <div className="gsearch-playlist">
              PLAYLIST
              {this.miniResults()}
            </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    songs: {...state.miniSongSearch},
    artists: {...state.miniArtistSearch},
    albums: {...state.miniAlbumSearch},
    playlists: {...state.miniPlaylistSearch},
  }),
  null
)(GeneralSearch);
