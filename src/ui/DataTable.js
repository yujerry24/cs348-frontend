import * as React from 'react';

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

export default class DataTable extends React.Component {
  constructor() {
    super();
    this.state = {
      popoverAnchorEl: null,
      selectedSongs: [],
      addToPlaylists: [],
    };
  }

  onClickHandler = (ids, playlistId) => {
    const { isSearch } = this.props;
    this.props.onClick(ids, playlistId, isSearch);
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

  renderRow = ([id, _row]) => {
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
          onClick={() => this.onClickHandler([id])}
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

    return (
      <TableRow key={`row-${id}`}>
        {Object.entries(_row).map(([key, _cell]) => {
          let data = _cell;
          if (key === 'video_duration') {
            // convert duration in miliseconds to min:sec format
            data = `${Math.floor(data / 60)}:${
              data % 60 < 10 ? '0' + (data % 60) : data % 60
            }`;
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
          {actionButtons}
        </TableCell>
      </TableRow>
    );
  };

  renderBody = () => {
    const { headings, rows } = this.props;
    return Object.keys(rows).length > 0 ? (
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
    const { availablePlaylists } = this.props;
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
          {availablePlaylists &&
            availablePlaylists.map(playlist => (
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
              this.state.addToPlaylists.forEach(playlistId =>
                this.onClickHandler(this.state.selectedSongs, playlistId)
              );
              this.setState({ addToPlaylists: [], selectedSongs: [] });
              this.handlePopoverClose();
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
