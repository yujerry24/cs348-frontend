import * as React from 'react';
import { connect } from 'react-redux';

import {
  Paper,
  Grid,
  GridList,
  GridListTile,
  ListSubheader,
  Card,
  CardContent,
  Typography,
  CircularProgress,
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
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography color="textSecondary">
            {this.joinStrings(artists)}
          </Typography>
          <Typography color="textSecondary">
            {album}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  artistItem = (data) => {
    let artist = data['name'];
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {artist}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  albumItem = (data) => {
    let album = data['name']
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {album}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  playlistItem = (data) => {
    let playlist = data['name']
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {playlist}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  miniResults = (header, pending, data, item) => {
    return (
      <Paper variant="outlined">
        <Grid container spacing={1}>
          {pending === true ?
            <CircularProgress />
            :
              <React.Fragment>
                {/* <GridList cellHeight={180} className={classes.gridList}> */}
                <GridList cellHeight={180}>
                  <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">{header}</ListSubheader>
                  </GridListTile>

                  {!data || data.length === 0 ?
                  <div>"No results found"</div>
                  :
                  data.map((data, index) => (
                    <GridListTile key={index}>
                      {item(data)}
                    </GridListTile>
                  ))}
                </GridList>
              </React.Fragment>
          }
        </Grid>
      </Paper>
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
