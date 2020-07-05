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
    const { rows, isSearch } = this.props;

    const actionButtons = [];

    if (isSearch) {
      actionButtons.push(
        <IconButton
          key={`add-${rowIndex}`}
          color="primary"
          size="medium"
          aria-label="add"
          edge="start"
          onClick={() => this.onClickHandler(rows[rowIndex][0])}
        >
          <Add />
        </IconButton>
      );
    } else {
      actionButtons.push(
        <IconButton
          key={`delete-${rowIndex}`}
          color="secondary"
          size="medium"
          aria-label="delete"
          onClick={() => this.onClickHandler(rows[rowIndex][0])}
        >
          <Delete />
        </IconButton>
      );
    }
    actionButtons.push(
      <Checkbox
        key={`favorite-${rowIndex}`}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        name="favorite"
      />
    );

    const rowDisplayData = rows[rowIndex].slice(1) || [];

    return (
      <TableRow key={`row-${rowIndex}`}>
        {rowDisplayData.map((_cell, cellIndex) => {
          return (
            <TableCell key={`${rowIndex}-${cellIndex}`} align={'left'}>
              {rowDisplayData[cellIndex]}
            </TableCell>
          );
        })}
        <TableCell
          key={`actions-${rowIndex}`}
          align={'left'}
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          {actionButtons}
        </TableCell>
      </TableRow>
    );
  };

  render() {
    const { headings, rows } = this.props;

    const headerContent = (
      <TableRow key="heading">{headings.map(this.renderHeadingRow)}</TableRow>
    );

    const bodyContent = rows.map(this.renderRow);

    return (
      <Table stickyHeader className="Table">
        <TableHead>{headerContent}</TableHead>
        <TableBody>{bodyContent}</TableBody>
      </Table>
    );
  }
}
