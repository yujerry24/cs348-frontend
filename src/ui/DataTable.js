import * as React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Checkbox,
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

import Add from '@material-ui/icons/PlaylistAdd';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Delete from '@material-ui/icons/Delete';
import './DataTable.scss';

import * as CallApi from '../utils/APICalls';
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
        this.props.fetchPlaylist(id);
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
    const { isSearch } = this.props;
    const actionButtons = [];

    if (isSearch) {
      actionButtons.push(
        <IconButton
          key={`add-${id}`}
          color="primary"
          size="medium"
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
          size="medium"
          aria-label="delete"
          onClick={() => this.onDelete([id])}
        >
          <Delete />
        </IconButton>
      );
    }
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
    return (
      <TableRow key={`row-${id}`}>
        {Object.entries(_row).map(([key, _cell]) => {
          let data = _cell;
          if (key === 'video_duration') {
            // convert duration in miliseconds to min:sec format
            data = `${Math.floor(data / 60)}:${
              data % 60 < 10 ? '0' + (data % 60) : data % 60
            }`;
          } else if (Array.isArray(data)) {
            // ex. songs with many artists
            data = data.sort().join(', ');
          }
          return (
            <TableCell key={`cell-${id}-${key}`} align={'left'}>
              {data}
            </TableCell>
          );
        })}
        <TableCell
          key={`actions-${id}`}
          align={'left'}
          style={{ padding: 0, minWidth: '90px' }}
        >
          {this.renderActionButtons(id)}
        </TableCell>
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

    return (
      <div>
        <Table stickyHeader className="Table">
          <TableHead>{headerContent}</TableHead>
          <TableBody>{bodyContent}</TableBody>
        </Table>
        {popover}
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    allPlaylists: state.allPlaylists.playlists,
    currentTab: state.mainApp.currentTab,
    rows: state.playlistsById[state.mainApp.currentTab]
      ? state.playlistsById[state.mainApp.currentTab].songsById
      : ownProps.rows,
  }),
  { fetchPlaylist }
)(DataTable);
