import * as actions from './actions';
// process.env.REACT_APP_ENDPOINT = https://ancient-ceiling-278919.ue.r.appspot.com
const API = process.env.REACT_APP_ENDPOINT || 'http://localhost:8080';

export const fetchAllPlaylists = userId => {
  return dispatch => {
    dispatch(actions.fetchAllPlaylistsPending());
    fetch(`${API}/playlist/list/${userId}`)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(actions.fetchAllPlaylistsSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(actions.fetchAllPlaylistsError(error));
      });
  };
};

export const fetchPlaylist = playlistId => {
  return dispatch => {
    dispatch(actions.fetchPlaylistPending);
    fetch(`${API}/playlist/${playlistId}`)
      .then(res => res.json())
      .then(res => {
        dispatch(actions.fetchPlaylistSuccess(playlistId, res));
        return res;
      })
      .catch(error => {
        dispatch(actions.fetchPlaylistError(error));
      });
  };
};
