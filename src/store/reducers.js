import * as types from './actionTypes';
import { TabNames } from '../utils/Constants';

const initAppState = {
  userId: '',
  currentTab: TabNames.SEARCH,
  validLogin: false,
  searchText: '',
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
    case types.SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText,
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
    case types.UPDATE_LIKED_IN_PLAYLIST:
      const newState = { ...state };
      Object.values(state).forEach(playlistObj => {
        if (playlistObj.songsById[action.songId]) {
          playlistObj.songsById[action.songId].isfavourite = action.isFavourite;
        }
      });
      return newState;
    default:
      return state;
  }
}

const initMiniSongSearchResults = {
  pending: false,
  songs: {},
};

const initMiniArtistSearchResults = {
  pending: false,
  artists: {},
};

const initMiniAlbumSearchResults = {
  pending: false,
  albums: {},
};

const initMiniPlaylistSearchResults = {
  pending: false,
  playlists: {},
};

export function miniSongSearch(state = initMiniSongSearchResults, action) {
  switch (action.type) {
    case types.FETCH_MINISONGSEARCH_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_MINISONGSEARCH_SUCCESS:
      return {
        ...state,
        pending: false,
        songs: action.songs,
      };
    case types.FETCH_MINISONGSEARCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function miniArtistSearch(state = initMiniArtistSearchResults, action) {
  switch (action.type) {
    case types.FETCH_MINIARTISTSEARCH_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_MINIARTISTSEARCH_SUCCESS:
      return {
        ...state,
        pending: false,
        artists: action.artists,
      };
    case types.FETCH_MINIARTISTSEARCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function miniAlbumSearch(state = initMiniAlbumSearchResults, action) {
  switch (action.type) {
    case types.FETCH_MINIALBUMSEARCH_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_MINIALBUMSEARCH_SUCCESS:
      return {
        ...state,
        pending: false,
        albums: action.albums,
      };
    case types.FETCH_MINIALBUMSEARCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function miniPlaylistSearch(
  state = initMiniPlaylistSearchResults,
  action
) {
  switch (action.type) {
    case types.FETCH_MINIPLAYLISTSEARCH_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_MINIPLAYLISTSEARCH_SUCCESS:
      return {
        ...state,
        pending: false,
        playlists: action.playlists,
      };
    case types.FETCH_MINIPLAYLISTSEARCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}
