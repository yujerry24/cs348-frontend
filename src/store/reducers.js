import * as types from './actionTypes';
import { TabNames } from '../utils/Constants';

const initAppState = {
  userId: '',
  currentTab: TabNames.SEARCH,
  validLogin: false,
  searchText: '',
  subSongs: {},
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
    case types.SET_SUB_SONGS:
      return {
        ...state,
        subSongs: action.songs,
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
      newState[action.playlistId].songsById[action.songId].isfavourite =
        action.isFavourite;
      return newState;
    default:
      return state;
  }
}

const initSongSearchResults = {
  pending: false,
  songs: {},
  count: 0,
};

export function songSearch(state = initSongSearchResults, action) {
  switch (action.type) {
    case types.FETCH_SONGSEARCH_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_SONGSEARCH_SUCCESS:
      return {
        ...state,
        pending: false,
        songs: action.songs,
        count: action.count,
      };
    case types.FETCH_SONGSEARCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case types.UPDATE_LIKED_IN_SEARCH:
      const newState = { ...state };
      newState.songs[action.songId].isfavourite = action.isFavourite;
      return newState;
    default:
      return state;
  }
}

const initArtistSearchResults = {
  pending: false,
  artists: {},
  count: 0,
};

export function artistSearch(state = initArtistSearchResults, action) {
  switch (action.type) {
    case types.FETCH_ARTISTSEARCH_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_ARTISTSEARCH_SUCCESS:
      return {
        ...state,
        pending: false,
        artists: action.artists,
        count: action.count,
      };
    case types.FETCH_ARTISTSEARCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

const initAlbumSearchResults = {
  pending: false,
  albums: {},
  count: 0,
};

export function albumSearch(state = initAlbumSearchResults, action) {
  switch (action.type) {
    case types.FETCH_ALBUMSEARCH_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_ALBUMSEARCH_SUCCESS:
      return {
        ...state,
        pending: false,
        albums: action.albums,
        count: action.count,
      };
    case types.FETCH_ALBUMSEARCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

const initPlaylistSearchResults = {
  pending: false,
  playlists: {},
  count: 0,
};

export function playlistSearch(state = initPlaylistSearchResults, action) {
  switch (action.type) {
    case types.FETCH_PLAYLISTSEARCH_PENDING:
      return {
        ...state,
        pending: true,
      };
    case types.FETCH_PLAYLISTSEARCH_SUCCESS:
      return {
        ...state,
        pending: false,
        playlists: action.playlists,
        count: action.count,
      };
    case types.FETCH_PLAYLISTSEARCH_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

const initSubSongSearch = {
  pending: false,
  songsById: {},
};

export function subSongSearch(state = initSubSongSearch, action) {
  switch (action.type) {
    case types.FETCH_ARTIST_SONGS_PENDING:
      return {
        pending: true,
      };
    case types.FETCH_ARTIST_SONGS_SUCCESS:
      return {
        pending: false,
        songsById: action.artistSongs,
      };
    case types.FETCH_ARTIST_SONGS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case types.FETCH_ALBUM_SONGS_PENDING:
      return {
        pending: true,
      };
    case types.FETCH_ALBUM_SONGS_SUCCESS:
      return {
        pending: false,
        songsById: action.albumSongs,
      };
    case types.FETCH_ALBUM_SONGS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case types.FETCH_PLAYLIST_SONGS_PENDING:
      return {
        pending: true,
      };
    case types.FETCH_PLAYLIST_SONGS_SUCCESS:
      return {
        pending: false,
        songsById: action.playlistSongs,
      };
    case types.FETCH_PLAYLIST_SONGS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case types.UPDATE_LIKED_IN_SUB_SEARCH:
      const newState = { ...state };
      newState.songsById[action.songId].isfavourite = action.isFavourite;
      return newState;
    default:
      return state;
  }
}
