import * as actions from './actions';
import * as CallApi from './../utils/APICalls';
// const API = process.env.REACT_APP_ENDPOINT = "https://ancient-ceiling-278919.ue.r.appspot.com";
// // process.env.REACT_APP_ENDPOINT = "https://ancient-ceiling-278919.ue.r.appspot.com"
// // const API = process.env.REACT_APP_ENDPOINT || 'http://localhost:8080';

export const fetchAllPlaylists = userId => {
  return dispatch => {
    dispatch(actions.fetchAllPlaylistsPending());
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
    CallApi.fetchPlaylist(playlistId, userId)
      .then(res => {
        dispatch(actions.fetchPlaylistSuccess(playlistId, res));
        return res;
      })
      .catch(error => {
        dispatch(actions.fetchPlaylistError(error));
      });
  };
};

export const fetchSongSearch = (searchText, count) => {
  return dispatch => {
    dispatch(actions.fetchSongSearchPending());
    CallApi.searchSongs(searchText, count)
      .then(res => {
        dispatch(actions.fetchSongSearchSuccess(res));
      })
      .catch(error => {
        dispatch(actions.fetchSongSearchError(error));
      });
  };
}

export const fetchArtistSearch = (searchText, count) => {
  return dispatch => {
    dispatch(actions.fetchArtistSearchPending());
    CallApi.searchArtists(searchText, count)
      .then(res => {
        dispatch(actions.fetchArtistSearchSuccess(res));
      })
      .catch(error => {
        dispatch(actions.fetchArtistSearchError(error));
      });
  };
}

export const fetchAlbumSearch = (searchText, count) => {
  return dispatch => {
    dispatch(actions.fetchAlbumSearchPending());
    CallApi.searchAlbums(searchText, count)
      .then(res => {
        dispatch(actions.fetchAlbumSearchSuccess(res));
      })
      .catch(error => {
        dispatch(actions.fetchAlbumSearchError(error));
      });
  };
}

export const fetchPlaylistSearch = (searchText, count) => {
  return dispatch => {
    dispatch(actions.fetchPlaylistSearchPending());
    CallApi.searchPlaylists(searchText, count)
      .then(res => {
        dispatch(actions.fetchPlaylistSearchSuccess(res));
      })
      .catch(error => {
        dispatch(actions.fetchPlaylistSearchError(error));
      });
  };
}