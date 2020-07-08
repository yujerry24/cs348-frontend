import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/PlaylistAdd';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Delete from '@material-ui/icons/Delete';
import './DataTable.scss';

export default class DataTable extends React.Component {
  onClickHandler = id => {
    const { isSearch } = this.props;
    this.props.onClick(id, isSearch);
  };

  renderHeadingRow = (_cell, cellIndex) => {
    const { headings } = this.props;

    return (
      <TableCell key={`heading-${cellIndex}`} align={'left'}>
        {headings[cellIndex]}
      </TableCell>
    );
  };

  renderRow = (_row, rowIndex) => {
    const { isSearch } = this.props;

    const actionButtons = [];

    if (isSearch) {
      actionButtons.push(
        <IconButton
          key={`add-${_row.song_id}`}
          color="primary"
          size="medium"
          aria-label="add"
          onClick={() => this.onClickHandler(_row.song_id)}
        >
          <Add />
        </IconButton>
      );
    } else {
      actionButtons.push(
        <IconButton
          key={`delete-${_row.song_id}`}
          color="secondary"
          size="medium"
          aria-label="delete"
          onClick={() => this.onClickHandler(_row.song_id)}
        >
          <Delete />
        </IconButton>
      );
    }
    actionButtons.push(
      <Checkbox
        key={`favorite-${_row.song_id}`}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        name="favorite"
      />
    );

    // remove song_id from data to be displayed
    const rowDisplayData = Object.entries(_row).slice(1);
    return (
      <TableRow key={`row-${_row.song_id}`}>
        {rowDisplayData.map(([key, _cell]) => {
          let data = _cell;
          if (key === 'video_duration') {
            // convert duration in miliseconds to min:sec format
            data = `${Math.floor(data / 60)}:${
              data % 60 < 10 ? '0' + (data % 60) : data % 60
            }`;
          }
          return (
            <TableCell key={`cell-${_row.song_id}-${key}`} align={'left'}>
              {data}
            </TableCell>
          );
        })}
        <TableCell
          key={`actions-${_row.song_id}`}
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
    return rows.length > 0 ? (
      rows.map(this.renderRow)
    ) : (
      <TableRow>
        <TableCell colSpan={headings.length} style={{ textAlign: 'center' }}>
          {'No Songs Found'}
        </TableCell>
      </TableRow>
    );
  };

  render() {
    const { headings } = this.props;

    const headerContent = (
      <TableRow key="heading">{headings.map(this.renderHeadingRow)}</TableRow>
    );

    const bodyContent = this.renderBody();

    return (
      <Table stickyHeader className="Table">
        <TableHead>{headerContent}</TableHead>
        <TableBody>{bodyContent}</TableBody>
      </Table>
    );
  }
}
