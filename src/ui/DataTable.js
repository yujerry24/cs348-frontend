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
} from '@material-ui/core';
// import TableContainer from '@material-ui/core/TableContainer';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableSortLabel from '@material-ui/core/TableSortLabel';

import {
  Add,
  Favorite,
  FavoriteBorder,
  Delete,
  PlayArrow,
} from '@material-ui/icons';
import './DataTable.scss';

import * as CallApi from '../utils/APICalls';
import { setPlayingPlaylist, setPlayingSong } from '../store/actions';
import { fetchPlaylist } from '../store/fetchCalls';

class DataTable extends React.Component {
  constructor() {
    super();
    this.state = {
      popoverAnchorEl: null,
      selectedSongs: [],
      addToPlaylists: [],
    };
  }

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
      this.props.fetchPlaylist(this.props.currentTab);
    });
  };

  onPlay = songId => {
    this.props.setPlayingPlaylist(this.props.currentTab);
    this.props.setPlayingSong(songId);
  };

  handleCheckbox = id => {
    const index = this.state.addToPlaylists.findIndex(item => item === id);
    if (index === -1) {
      this.setState({ addToPlaylists: this.state.addToPlaylists.concat([id]) });
    } else {
      this.setState({
        addToPlaylists: this.state.addToPlaylists.slice(index, 1),
      });
    }
  };

  renderHeadingRow = _cell => (
    <TableCell key={`heading-${_cell}`} align={'left'}>
      {_cell}
    </TableCell>
  );

  renderActionButtons = id => {
    const { isPlaylist } = this.props;
    const actionButtons = [];

    if (!isPlaylist) {
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
    } else {
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
      <Checkbox
        key={`favorite-${id}`}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        name="favorite"
      />
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
        {dataCells}
        {this.props.headings.indexOf('Actions') !== -1 && (
          <TableCell
            key={`actions-${id}`}
            align={'left'}
            style={{ padding: 0, minWidth: '110px' }}
          >
            {this.renderActionButtons(id)}
          </TableCell>
        )}
      </TableRow>
    );
  };

  renderBody = () => {
    const { headings, rows } = this.props;
    return rows && Object.keys(rows).length > 0 ? (
      Object.entries(rows).map(this.renderRow)
    ) : (
      <TableRow>
        <TableCell colSpan={headings.length} style={{ textAlign: 'center' }}>
          {'No Songs Found'}
        </TableCell>
      </TableRow>
    );
  };

  renderPopover = () => {
    const { allPlaylists } = this.props;
    const open = Boolean(this.state.popoverAnchorEl);
    const id = open ? 'add-to-playlist-popover' : undefined;

    const popoverContent =
      allPlaylists && allPlaylists.length > 0 ? (
        <FormGroup className="add-to-playlist-list">
          {allPlaylists &&
            allPlaylists.map(playlist => (
              <FormControlLabel
                key={`add-to-playlist-${playlist.name}`}
                control={
                  <Checkbox
                    onChange={() => this.handleCheckbox(playlist.playlist_id)}
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
          this.setState({ popoverAnchorEl: null });
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

  render() {
    const { headings } = this.props;

    const headerContent = (
      <TableRow key="heading">{headings.map(this.renderHeadingRow)}</TableRow>
    );

    const bodyContent = this.renderBody();
    const popover = this.renderPopover();
    const loading = this.props.pending && (
      <div className="loading">
        <CircularProgress />
      </div>
    );
    return (
      <>
        {loading}
        <Table stickyHeader className="Table">
          <TableHead>{headerContent}</TableHead>
          <TableBody>{bodyContent}</TableBody>
        </Table>
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
      state.playlistsById[state.mainApp.currentTab] &&
      state.playlistsById[state.mainApp.currentTab].pending,
  }),
  { setPlayingPlaylist, setPlayingSong, fetchPlaylist }
)(DataTable);
