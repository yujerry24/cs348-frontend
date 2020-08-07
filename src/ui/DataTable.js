import * as React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
// import TableContainer from '@material-ui/core/TableContainer';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableSortLabel from '@material-ui/core/TableSortLabel';

import {
  Add,
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Delete,
  LibraryMusic,
  PlayArrow,
} from '@material-ui/icons';
import './DataTable.scss';

import { TabNames } from '../utils/Constants';
import * as CallApi from '../utils/APICalls';
import {
  setPlayingPlaylist,
  setPlayingSong,
  setSubSongs,
  updateLikedInPlaylist,
  updateLikedInSearch,
  updateLikedInSubSearch,
} from '../store/actions';
import { fetchPlaylist } from '../store/fetchCalls';

class DataTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      popoverAnchorEl: null,
      selectedSongs: [],
      addToPlaylists: [],
      multiSong: false,
      enableMultiSelect:
        props.isPlaylist ||
        props.isSongSearch ||
        props.currentTab === TabNames.TOPSONGS,
    };
  }

  componentDidUpdate = prevProps => {
    const { currentTab, isPlaylist, isSongSearch } = this.props;
    if (prevProps.currentTab !== currentTab) {
      this.setState({ selectedSongs: [], multiSong: false });
    }
    if (
      prevProps.isPlaylist !== isPlaylist ||
      prevProps.isSongSearch !== isSongSearch ||
      prevProps.currentTab !== currentTab
    ) {
      this.setState({
        enableMultiSelect:
          isPlaylist || isSongSearch || currentTab === TabNames.TOPSONGS,
      });
    }
  };

  onAdd = (ids, playlistIds) => {
    CallApi.addSongs(ids, playlistIds).then(() => {
      playlistIds.forEach(id => {
        this.props.fetchPlaylist(id, this.props.userId);
      });
    });
  };
  // prompt user for which playlist(s) to add to

  onDelete = ids => {
    // I don't think we need to call requery when we know what got deleted
    CallApi.deleteSongs(ids, this.props.currentTab).then(() => {
      this.props.fetchPlaylist(this.props.currentTab, this.props.userId);
    });
  };

  onPlay = songId => {
    if (this.props.title) {
      this.props.setSubSongs(this.props.rows);
    }
    this.props.setPlayingPlaylist(this.props.title || this.props.currentTab);
    this.props.setPlayingSong(songId);
  };

  handleSongsCheck = id => {
    const index = this.state.selectedSongs.findIndex(item => item === id);
    if (index === -1) {
      this.setState({
        selectedSongs: this.state.selectedSongs.concat([id]),
        multiSong: true,
      });
    } else if (this.state.multiSong && this.state.selectedSongs.length === 1) {
      this.setState({
        selectedSongs: [],
        multiSong: false,
      });
    } else {
      this.setState({
        selectedSongs: this.state.selectedSongs
          .slice(0, index)
          .concat(this.state.selectedSongs.slice(index + 1)),
      });
    }
  };

  handleToggleAllSongs = () => {
    const { rows } = this.props;
    if (this.state.selectedSongs.length === Object.keys(rows).length) {
      this.setState({ selectedSongs: [], multiSong: false });
    } else {
      this.setState({ selectedSongs: Object.keys(rows), multiSong: true });
    }
  };

  handlePlaylistsCheck = id => {
    const index = this.state.addToPlaylists.findIndex(item => item === id);
    if (index === -1) {
      this.setState({ addToPlaylists: this.state.addToPlaylists.concat([id]) });
    } else {
      this.setState({
        addToPlaylists: this.state.addToPlaylists
          .slice(0, index)
          .concat(this.state.addToPlaylists.slice(index + 1)),
      });
    }
  };

  handleFavourite = (id, isFav) => {
    let playlist_id = this.props.userId + '-liked-songs';
    if (!isFav) {
      CallApi.addSongs([id], [playlist_id]).then(() => {
        this.props.fetchPlaylist(playlist_id, this.props.userId);
      });

      this.updateLiked(id, true);
    } else {
      CallApi.deleteSongs([id], playlist_id).then(() => {
        this.props.fetchPlaylist(playlist_id, this.props.userId);
      });
      this.updateLiked(id, false);
    }
  };

  updateLiked = (id, newVal) => {
    if (this.props.currentTab === TabNames.TOPSONGS) {
      //update isfavourite status of top songs results
      //only needs to be done when on the topsongs tab
      this.props.updateLikedPopSong(id, newVal);
    }

    //update local state for playlists
    Object.entries(this.props.playlistsById).forEach(([key, val]) => {
      if (val.songsById && val.songsById[id]) {
        this.props.updateLikedInPlaylist(key, id, newVal);
      }
    });

    //update local state for search results
    Object.keys(this.props.searchSongs).forEach(key => {
      if (key === id) {
        this.props.updateLikedInSearch(key, newVal);
      }
    });

    //update local state for search results
    Object.keys(this.props.subSongSearch).forEach(key => {
      if (key === id) {
        this.props.updateLikedInSubSearch(key, newVal);
      }
    });
  };

  renderHeadingRow = _cell => (
    <TableCell key={`heading-${_cell}`} align={'left'}>
      {_cell}
    </TableCell>
  );

  renderActionButtons = (id, isfave) => {
    const { isPlaylist } = this.props;
    const actionButtons = [];

    actionButtons.push(
      <IconButton
        key={`add-${id}`}
        color="primary"
        size="small"
        aria-label="add"
        onClick={e => {
          this.setState({
            popoverAnchorEl: e.currentTarget,
            selectedSongs: this.state.selectedSongs.concat(id),
          });
        }}
      >
        <Add />
      </IconButton>
    );
    if (isPlaylist && !this.props.currentTab.includes('liked-songs')) {
      actionButtons.push(
        <IconButton
          key={`delete-${id}`}
          color="secondary"
          size="small"
          aria-label="delete"
          onClick={() => this.onDelete([id])}
        >
          <Delete />
        </IconButton>
      );
    }
    actionButtons.push(
      <IconButton
        key={`play-${id}`}
        color="secondary"
        size="small"
        aria-label="play"
        onClick={() => this.onPlay(id)}
      >
        <PlayArrow />
      </IconButton>
    );
    actionButtons.push(
      <IconButton
        key={`favorite-${id}`}
        size="small"
        aria-label="favorite"
        onClick={() => this.handleFavourite(id, isfave)}
      >
        {isfave ? <Favorite color="secondary" /> : <FavoriteBorder />}
      </IconButton>
    );
    return actionButtons;
  };

  renderRow = ([id, _row]) => {
    const dataCells = [];
    Object.entries(_row).forEach(([key, _cell]) => {
      let data = _cell;
      let skipAttrs = ['isfavourite', 'video_id'];

      if (key === 'video_duration') {
        // convert duration in miliseconds to min:sec format
        data = `${Math.floor(data / 60)}:${
          data % 60 < 10 ? '0' + (data % 60) : data % 60
        }`;
      } else if (Array.isArray(data)) {
        // ex. songs with many artists
        data = data.sort().join(', ');
      }

      !skipAttrs.includes(key) &&
        dataCells.push(
          <TableCell key={`cell-${id}-${key}`} align={'left'}>
            {data}
          </TableCell>
        );
    });

    return (
      <TableRow key={`row-${id}`}>
        {this.state.enableMultiSelect && (
          <TableCell>
            <Checkbox
              key={`song-checkbox-${id}`}
              checked={this.state.selectedSongs.includes(id)}
              onChange={() => this.handleSongsCheck(id)}
            />
          </TableCell>
        )}
        {dataCells}
        {this.props.headings.indexOf('Actions') !== -1 && (
          <TableCell
            key={`actions-${id}`}
            align={'left'}
            style={{ padding: 0, minWidth: '130px' }}
          >
            {this.renderActionButtons(id, _row.isfavourite)}
          </TableCell>
        )}
        {this.props.handleGetSongs && !this.props.isSongSearch && (
          <TableCell
            key={`see-songs-${id}`}
            align={'center'}
            style={{ padding: 0, width: '120px' }}
          >
            <IconButton
              key={`see-songs-${id}`}
              color="primary"
              size="small"
              aria-label="see-songs"
              onClick={() => {
                this.props.handleGetSongs(id, _row.name);
              }}
            >
              <LibraryMusic />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
    );
  };

  renderBody = () => {
    const { headings, rows } = this.props;
    const numColumns = this.state.enableMultiSelect
      ? headings.length + 1
      : headings.length;
    return rows && Object.keys(rows).length > 0 ? (
      Object.entries(rows).map(this.renderRow)
    ) : (
      <TableRow>
        <TableCell colSpan={numColumns} style={{ textAlign: 'center' }}>
          {'No Songs Found'}
        </TableCell>
      </TableRow>
    );
  };

  renderPopover = () => {
    const { allPlaylists, currentTab } = this.props;
    const open = Boolean(this.state.popoverAnchorEl);
    const id = open ? 'add-to-playlist-popover' : undefined;

    const userPlaylists = allPlaylists.filter(
      playlist =>
        !playlist.playlist_id.includes('liked-songs') &&
        playlist.playlist_id !== currentTab
    );

    const popoverContent =
      userPlaylists && userPlaylists.length > 0 ? (
        <FormGroup className="add-to-playlist-list">
          {userPlaylists.map(playlist => (
            <FormControlLabel
              key={`add-to-playlist-${playlist.name}`}
              control={
                <Checkbox
                  onChange={() =>
                    this.handlePlaylistsCheck(playlist.playlist_id)
                  }
                />
              }
              label={playlist.name}
            />
          ))}
          <Button
            onClick={() => {
              this.onAdd(this.state.selectedSongs, this.state.addToPlaylists);
              this.setState({
                addToPlaylists: [],
                selectedSongs: [],
                popoverAnchorEl: null,
                multiSong: false,
              });
            }}
          >
            Add
          </Button>
        </FormGroup>
      ) : (
        <div style={{ padding: '24px', width: '200px' }}>
          {'You must create a playlist first before you can add songs to one.'}
        </div>
      );
    return (
      <Popover
        id={id}
        open={open}
        anchorEl={this.state.popoverAnchorEl}
        onClose={() => {
          this.setState({
            addToPlaylists: [],
            selectedSongs: [],
            popoverAnchorEl: null,
            multiSong: false,
          });
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {popoverContent}
      </Popover>
    );
  };

  renderToolbar = () => {
    let currPlaylist = this.props.allPlaylists.find(
      p => p.playlist_id === this.props.currentTab
    );
    let title = this.props.title;
    if (!title) {
      title =
        this.props.isPlaylist && currPlaylist
          ? currPlaylist.name
          : this.props.currentTab;
    }
    return (
      <div
        className={
          this.state.multiSong ? 'table-toolbar-selected' : 'table-toolbar'
        }
      >
        <div className="table-toolbar-title">
          {this.props.isSearch && (
            <IconButton
              key={`back-to-search`}
              color="primary"
              size="small"
              aria-label="back"
              onClick={() => {
                this.props.backToSearch();
              }}
            >
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h5">{title}</Typography>
        </div>
        {this.state.multiSong && (
          <div className="table-toolbar-multi-actions">
            <p>{`${this.state.selectedSongs.length} selected`}</p>
            <div className="table-toolbar-button">
              <Button
                color="primary"
                variant="contained"
                onClick={e => {
                  this.setState({
                    popoverAnchorEl: e.currentTarget,
                  });
                }}
              >
                Add to Playlists
              </Button>
            </div>
            {this.props.isPlaylist &&
              !this.props.currentTab.includes('liked-songs') && (
                <div className="table-toolbar-button">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      this.onDelete(this.state.selectedSongs);
                      this.setState({ selectedSongs: [], multiSong: false });
                    }}
                  >
                    Delete from playlist
                  </Button>
                </div>
              )}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { headings, rows } = this.props;
    const rowsLength = rows ? Object.keys(rows).length : 0;

    const headerContent = (
      <TableRow key="heading">
        {this.state.enableMultiSelect && (
          <TableCell
            key={`actions-selectAll`}
            align={'left'}
            style={{ minWidth: '90px' }}
          >
            <Checkbox
              onClick={this.handleToggleAllSongs}
              checked={
                this.state.selectedSongs.length === rowsLength &&
                rowsLength !== 0
              }
              indeterminate={
                this.state.selectedSongs.length !== rowsLength &&
                this.state.selectedSongs.length !== 0 &&
                this.state.multiSong
              }
              disabled={rowsLength === 0}
              inputProps={{ 'aria-label': 'all items selected' }}
            />
          </TableCell>
        )}
        {headings.map(this.renderHeadingRow)}
      </TableRow>
    );

    const bodyContent = this.renderBody();
    const popover = this.renderPopover();
    const loading = this.props.pending && (
      <div className="loading">
        <CircularProgress />
      </div>
    );
    const toolbar = this.renderToolbar();

    return (
      <>
        {loading}
        {toolbar}
        <div className="table-container">
          <Table stickyHeader className="Table">
            <TableHead>{headerContent}</TableHead>
            <TableBody>{bodyContent}</TableBody>
          </Table>
        </div>
        {popover}
      </>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    allPlaylists: state.allPlaylists.playlists,
    currentTab: state.mainApp.currentTab,
    userId: state.mainApp.userId,
    rows:
      ownProps.rows ||
      (state.playlistsById[state.mainApp.currentTab] &&
        state.playlistsById[state.mainApp.currentTab].songsById),
    pending:
      ownProps.pending ||
      (state.playlistsById[state.mainApp.currentTab] &&
        state.playlistsById[state.mainApp.currentTab].pending),
    playlistsById: state.playlistsById,
    searchSongs: state.songSearch.songs,
    subSongSearch: state.subSongSearch.songsById,
  }),
  {
    setPlayingPlaylist,
    setPlayingSong,
    setSubSongs,
    fetchPlaylist,
    updateLikedInPlaylist,
    updateLikedInSearch,
    updateLikedInSubSearch,
  }
)(DataTable);
