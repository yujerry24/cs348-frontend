import * as types from './actionTypes';
import { TabNames } from '../utils/Constants';
// import * as filters from './filters';

const initAppState = {
  userId: '',
  currentTab: TabNames.SEARCH,
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
        [action.playlistId]: { pending: true },
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
