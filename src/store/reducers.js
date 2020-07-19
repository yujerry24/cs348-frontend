import * as types from './actionTypes';
import { TabNames } from '../utils/Constants';

const initAppState = {
  userId: '',
  currentTab: TabNames.SEARCH,
  validLogin: false,
};

export const mainApp = (state = initAppState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        userId: action.userId,
      };
    case types.SET_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.tab,
      };
    case types.SET_LOGIN_VALIDITY:
      return {
        ...state,
        validLogin: action.isValid,
      };
    case types.SET_PLAYING_SONG:
      return {
        ...state,
        playingSong: action.songId,
      };
    case types.SET_PLAYING_PLAYLIST:
      return {
        ...state,
        playingPlaylist: action.playlistId,
      };
    default:
      return state;
  }
};

const initAllPlaylists = {
  pending: false,
  playlists: [],
};

export const allPlaylists = (state = initAllPlaylists, action) => {
  switch (action.type) {
    case types.FETCH_ALL_PLAYLISTS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_ALL_PLAYLISTS_SUCCESS:
      return {
        ...state,
        pending: false,
        playlists: action.playlists,
      };

    case types.FETCH_ALL_PLAYLISTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export function playlistsById(state = {}, action) {
  switch (action.type) {
    case types.FETCH_PLAYLIST_PENDING:
      return {
        ...state,
        [action.playlistId]: { ...state[action.playlistId], pending: true },
      };
    case types.FETCH_PLAYLIST_SUCCESS:
      return {
        ...state,
        [action.playlistId]: { pending: false, songsById: action.songs },
      };
    case types.FETCH_PLAYLIST_ERROR:
      return {
        ...state,
        [action.playlistId]: { pending: false, error: action.error },
      };
    default:
      return state;
  }
}
