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

// export const search = async text => {
//   return fetch(`${API}/song/${text}`).then(res => res.json());
// };

// export const addSongs = async (songIds, playlistIds) => {
//   return fetch(`${API}/playlist/add`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     body: JSON.stringify({ songIds, playlistIds }),
//   }).then(() => {
//     console.log('Add Success');
//   });
// };

// export const deleteSongs = async (songIds, playlistId) => {
//   return fetch(`${API}/playlist/remove/${playlistId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     body: JSON.stringify({ songIds: songIds }),
//   }).then(() => {
//     console.log('Delete Success');
//   });
// };

// export const fetchPlaylist = async playlistId => {
//   return fetch(`${API}/playlist/${playlistId}`).then(res => res.json());
// };

// export const createPlaylist = async (name, userId) => {
//   return fetch(`${API}/playlist`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     body: JSON.stringify({
//       playlistName: name,
//       userId: userId,
//     }),
//   }).then(res => res.json());
// };

// export const deletePlaylist = async playlistId => {
//   return fetch(`${API}/playlist/${playlistId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//   }).then(res => res);
// };
