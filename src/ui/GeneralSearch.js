import * as React from 'react';
import { connect } from 'react-redux';

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
} from '@material-ui/core';

import {
  Search,
} from '@material-ui/icons';

import './GeneralSearch.scss';

class GeneralSearch extends React.Component {

  joinStrings = (list) => {
    let str = "";
    if (!Array.isArray(list)) {
      return list;
    } else if (!list || list.length === 0) {
      return str;
    } else if (list.length === 1) {
      return list[0];
    } else {
      list.forEach(item => {
        str += ", " + item;
      })
      return str.substr(str.length - 1)
    }
  }

  songItem = (data) => {
    let name = data['song_name']
    let artists = data['artist_name']
    let album = data['album_name']
    return (
      <Card raised={true} className="card">
        <CardContent>
          <Typography variant="h5" noWrap={true}>
            {name}
          </Typography>
          <Typography color="textSecondary" noWrap={true}>
            {this.joinStrings(artists)}
          </Typography>
          <Typography color="textSecondary" noWrap={true}>
            {album}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  artistItem = (data) => {
    let artist = data['name'];
    return (
      <Card raised={true} className="card">
        <CardContent>
          <Typography variant="h5" noWrap={true}>
            {artist}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  albumItem = (data) => {
    let album = data['name']
    return (
      <Card raised={true} className="card">
        <CardContent>
          <Typography variant="h5" noWrap={true}>
            {album}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  playlistItem = (data) => {
    let playlist = data['name']
    return (
      <Card raised={true} className="card">
        <CardContent>
          <Typography variant="h5" noWrap={true}>
            {playlist}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  miniResults = (header, pending, data, item) => {
    return (
        <Grid container spacing={1}>
          {pending === true ?
            <CircularProgress />
            :
              <div className="list">
                  <div className="list-title">
                    <Typography variant="h2" noWrap={true} >
                      {header}
                    </Typography>
                    <Button 
                      className="show-more"
                    >
                      Show more
                    </Button>
                  </div>

                  {!data || data.length === 0 ?
                    <Typography variant="h5" noWrap={true}>
                      No results found.
                    </Typography>
                  :
                  data.map((data, index) => (
                      item(data)
                  ))}
              </div>
          }
        </Grid>
    )
  }

  render() {
    return (
      <div className="gsearch">
        {this.props.searchText !== "" ?
        <React.Fragment>
          <div className="gsearch-row">
            <div className="gsearch-song">
              {this.miniResults("Songs", this.props.songs['pending'], Object.values(this.props.songs['songs']), this.songItem)}
            </div>
            <div className="gsearch-artist">
              {this.miniResults("Artists", this.props.artists['pending'], Object.values(this.props.artists['artists']), this.artistItem)}
            </div>
          </div>
          <div className="gsearch-row">
            <div className="gsearch-album">
              {this.miniResults("Albums", this.props.albums['pending'], Object.values(this.props.albums['albums']), this.albumItem)}
            </div>
            <div className="gsearch-playlist">
              {this.miniResults("Playlists", this.props.playlists['pending'], Object.values(this.props.playlists['playlists']), this.playlistItem)}
            </div>
          </div>
        </React.Fragment>
        :
        <div className="gsearch-blank">
          <Search style={{ fontSize: 100 }}/>
          <Typography variant="h2">
            Search
          </Typography>
          <Typography variant="button">
            Find your favourite kpop songs, albums, artists and playlists.
          </Typography>
        </div>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    searchText: state.mainApp.searchText,
    songs: { ...state.miniSongSearch },
    artists: { ...state.miniArtistSearch },
    albums: { ...state.miniAlbumSearch },
    playlists: { ...state.miniPlaylistSearch },
  }),
  null
)(GeneralSearch);
