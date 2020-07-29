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

import { Search } from '@material-ui/icons';

import './GeneralSearch.scss';
import DataTable from './DataTable';
import {
  fetchSongSearch,
  fetchArtistSearch,
  fetchAlbumSearch,
  fetchPlaylistSearch,
} from '../store/fetchCalls';

const SEARCH = 'Search';
const ARTISTS = 'Artists';
const ALBUMS = 'Albums';
const PLAYLISTS = 'Playlists';
const SONGS = 'Songs';

class GeneralSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      type: SEARCH,
    };

    this.tableHeadersMap = {
      Songs: ['Name', 'Artists', 'Album', 'Duration', 'Actions'],
      Artists: ['Name'],
      Albums: ['Name'],
      Playlists: ['Name', 'Username'],
    };
  }

  componentDidUpdate = prevProps => {
    const { searchText } = this.props;
    if (prevProps.searchText !== searchText) {
      this.setState({ type: SEARCH });
    }
  };

  joinStrings = list => {
    let str = '';
    if (!Array.isArray(list)) {
      return list;
    } else if (!list || list.length === 0) {
      return str;
    } else if (list.length === 1) {
      return list[0];
    } else {
      list.forEach(item => {
        str += ', ' + item;
      });
      return str.substr(str.length - 1);
    }
  };

  songItem = data => {
    let name = data['song_name'];
    let artists = data['artist_name'];
    let album = data['album_name'];
    return (
      <Card key={`card-song-${name}-${album}`} raised={true} className="card">
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
    );
  };

  artistItem = data => {
    let artist = data['name'];
    return (
      <Card key={`card-artist-${artist}`} raised={true} className="card">
        <CardContent>
          <Typography variant="h5" noWrap={true}>
            {artist}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  albumItem = data => {
    let album = data['name'];
    return (
      <Card key={`card-album-${album}`} raised={true} className="card">
        <CardContent>
          <Typography variant="h5" noWrap={true}>
            {album}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  playlistItem = data => {
    let playlist = data['name'];
    return (
      <Card key={`card-playlist-${playlist}`} raised={true} className="card">
        <CardContent>
          <Typography variant="h5" noWrap={true}>
            {playlist}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  moreResults = header => {
    const { searchText, userId } = this.props;
    if (this.props[header]['count']) {
      if (header === ARTISTS) {
        this.props.fetchArtistSearch(searchText);
      } else if (header === ALBUMS) {
        this.props.fetchAlbumSearch(searchText);
      } else if (header === PLAYLISTS) {
        this.props.fetchPlaylistSearch(searchText);
      } else if (header === SONGS) {
        this.props.fetchSongSearch(userId, searchText);
      }
    }
  };

  miniResults = (header, pending, data, item) => {
    return (
      <Grid ket={header} container spacing={1}>
        <div className="list">
          <div className="list-title">
            <Typography variant="h2" noWrap={true}>
              {header}
            </Typography>
            <Button
              className="show-more"
              color="primary"
              variant="contained"
              disabled={pending || !data || data.length === 0}
              onClick={() => {
                this.moreResults(header);
                this.setState({ type: header });
              }}
            >
              Show more
            </Button>
          </div>
          {pending === true ? (
            <CircularProgress />
          ) : !data || data.length === 0 ? (
            <Typography variant="h5" noWrap={true}>
              No results found.
            </Typography>
          ) : (
            data.slice(0, 5).map(data => item(data))
          )}
        </div>
      </Grid>
    );
  };

  render() {
    const { type } = this.state;

    return type === 'Search' ? (
      <div className="gsearch">
        {this.props.searchText !== '' ? (
          <React.Fragment>
            <div className="gsearch-row">
              <div className="gsearch-song">
                {this.miniResults(
                  SONGS,
                  this.props[SONGS]['pending'],
                  Object.values(this.props[SONGS]['songs']),
                  this.songItem
                )}
              </div>
              <div className="gsearch-artist">
                {this.miniResults(
                  ARTISTS,
                  this.props[ARTISTS]['pending'],
                  Object.values(this.props[ARTISTS]['artists']),
                  this.artistItem
                )}
              </div>
            </div>
            <div className="gsearch-row">
              <div className="gsearch-album">
                {this.miniResults(
                  ALBUMS,
                  this.props[ALBUMS]['pending'],
                  Object.values(this.props[ALBUMS]['albums']),
                  this.albumItem
                )}
              </div>
              <div className="gsearch-playlist">
                {this.miniResults(
                  PLAYLISTS,
                  this.props[PLAYLISTS]['pending'],
                  Object.values(this.props[PLAYLISTS]['playlists']),
                  this.playlistItem
                )}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="gsearch-blank">
            <Search style={{ fontSize: 100 }} />
            <Typography variant="h2">Search</Typography>
            <Typography variant="button">
              Find your favourite kpop songs, albums, artists and playlists.
            </Typography>
          </div>
        )}
      </div>
    ) : (
      <>
        {this.props[this.state.type]['pending'] && (
          <CircularProgress className="progress" />
        )}
        <DataTable
          headings={this.tableHeadersMap[type]}
          isPlaylist={type === SONGS} // will show multi song select options when isPlaylist is true
          isSearch
          backToSearch={() => {
            this.setState({ type: SEARCH });
          }}
          rows={this.props[this.state.type][type.toLowerCase()]}
        />
      </>
    );
  }
}

export default connect(
  state => ({
    searchText: state.mainApp.searchText,
    [SONGS]: { ...state.songSearch },
    [ARTISTS]: { ...state.artistSearch },
    [ALBUMS]: { ...state.albumSearch },
    [PLAYLISTS]: { ...state.playlistSearch },
    userId: state.mainApp.userId,
  }),
  {
    fetchSongSearch,
    fetchArtistSearch,
    fetchAlbumSearch,
    fetchPlaylistSearch,
  }
)(GeneralSearch);
