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
import * as CallApi from './../misc/APICalls';

export default class PlaylistCreator extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  createPlaylist = () => {
    CallApi.createPlaylist(`Playlist${this.props.playlists.length}`, this.props.userId)
    .then(res => {
      this.props.updateAllPlaylists(this.props.userId);
      this.setState({ currentTab: res });
    })
    .catch(err => err);
    alert('create a new playlist');
  }
 
  render() {
    return (
      <div>
          Working In Progress Put Create Playlist logic here

      </div>
    );
  }
}
