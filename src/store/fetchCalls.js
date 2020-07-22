import * as actions from './actions';
import * as CallApi from './../utils/APICalls';
// const API = process.env.REACT_APP_ENDPOINT = "https://ancient-ceiling-278919.ue.r.appspot.com";
// // process.env.REACT_APP_ENDPOINT = "https://ancient-ceiling-278919.ue.r.appspot.com"
// // const API = process.env.REACT_APP_ENDPOINT || 'http://localhost:8080';

export const fetchAllPlaylists = userId => {
  return dispatch => {
    dispatch(actions.fetchAllPlaylistsPending());
    // fetch(`${API}/playlist/list/${userId}`)
    //   .then(res => res.json())
    CallApi.fetchAllPlaylists(userId)
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(
          actions.fetchAllPlaylistsSuccess(Array.isArray(res) ? res : [])
        );
        return res;
      })
      .catch(error => {
        dispatch(actions.fetchAllPlaylistsError(error));
      });
  };
};

export const fetchPlaylist = (playlistId, userId) => {
  return dispatch => {
    dispatch(actions.fetchPlaylistPending);
    CallApi.fetchPlaylist(playlistId)
    // fetch(`${API}/playlist/${playlistId}`)
    //   .then(res => res.json())
      .then(res => {
        dispatch(actions.fetchPlaylistSuccess(playlistId, res));
        return res;
      })
      .catch(error => {
        dispatch(actions.fetchPlaylistError(error));
      });
  };
};

export const fetchMiniSongSearch = searchText => {
  return dispatch => {
    dispatch(actions.fetchMiniSongSearchPending());
    CallApi.miniSearchSongs(searchText)
      .then(res => {
        dispatch(actions.fetchMiniSongSearchSuccess(res));
      })
      .catch(error => {
        dispatch(actions.fetchMiniSongSearchError(error));
      });
  };
}

export const fetchMiniArtistSearch = searchText => {
  return dispatch => {
    dispatch(actions.fetchMiniArtistSearchPending());
    CallApi.miniSearchArtists(searchText)
      .then(res => {
        dispatch(actions.fetchMiniArtistSearchSuccess(res));
      })
      .catch(error => {
        dispatch(actions.fetchMiniArtistSearchError(error));
      });
  };
}

export const fetchMiniAlbumSearch = searchText => {
  return dispatch => {
    dispatch(actions.fetchMiniAlbumSearchPending());
    CallApi.miniSearchAlbums(searchText)
      .then(res => {
        dispatch(actions.fetchMiniAlbumSearchSuccess(res));
      })
      .catch(error => {
        dispatch(actions.fetchMiniAlbumSearchError(error));
      });
  };
}

export const fetchMiniPlaylistSearch = searchText => {
  return dispatch => {
    dispatch(actions.fetchMiniPlaylistSearchPending());
    CallApi.miniSearchPlaylists(searchText)
      .then(res => {
        dispatch(actions.fetchMiniPlaylistSearchSuccess(res));
      })
      .catch(error => {
        dispatch(actions.fetchMiniPlaylistSearchError(error));
      });
  };
}