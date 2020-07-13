import * as actions from './actionTypes';

export const setUser = userId => {
  return {
    type: actions.SET_USER,
    userId,
  };
};

export const setCurrentTab = tab => {
  return {
    type: actions.SET_CURRENT_TAB,
    tab,
  };
};

export const setValidLogin = isValid => {
  return {
    type: actions.SET_LOGIN_VALIDITY,
    isValid,
  };
};

export const fetchAllPlaylistsPending = () => {
  return {
    type: actions.FETCH_ALL_PLAYLISTS_PENDING,
  };
};

export const fetchAllPlaylistsSuccess = playlists => {
  return {
    type: actions.FETCH_ALL_PLAYLISTS_SUCCESS,
    playlists,
  };
};

export const fetchAllPlaylistsError = error => {
  return {
    type: actions.FETCH_ALL_PLAYLISTS_ERROR,
    error,
  };
};

export const fetchPlaylistPending = playlistId => {
  return {
    type: actions.FETCH_PLAYLIST_PENDING,
    playlistId,
  };
};

export const fetchPlaylistSuccess = (playlistId, songs) => {
  return {
    type: actions.FETCH_PLAYLIST_SUCCESS,
    playlistId,
    songs,
  };
};

export const fetchPlaylistError = (playlistId, error) => {
  return {
    type: actions.FETCH_PLAYLIST_ERROR,
    playlistId,
    error,
  };
};
