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

export const setPlayingSong = songId => {
  return {
    type: actions.SET_PLAYING_SONG,
    songId,
  };
};

export const setPlayingPlaylist = playlistId => {
  return {
    type: actions.SET_PLAYING_PLAYLIST,
    playlistId,
  };
};

export const setSearchText = searchText => {
  return {
    type: actions.SET_SEARCH_TEXT,
    searchText,
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

//////////////////

export const fetchMiniSongSearchPending = () => {
  return {
    type: actions.FETCH_MINISONGSEARCH_PENDING,
  };
};

export const fetchMiniSongSearchSuccess = (songs) => {
  return {
    type: actions.FETCH_MINISONGSEARCH_SUCCESS,
    songs,
  };
};

export const fetchMiniSongSearchError = (error) => {
  return {
    type: actions.FETCH_MINISONGSEARCH_ERROR,
    error,
  };
};

export const fetchMiniArtistSearchPending = () => {
  return {
    type: actions.FETCH_MINIARTISTSEARCH_PENDING,
  };
};

export const fetchMiniArtistSearchSuccess = (artists) => {
  return {
    type: actions.FETCH_MINIARTISTSEARCH_SUCCESS,
    artists,
  };
};

export const fetchMiniArtistSearchError = (error) => {
  return {
    type: actions.FETCH_MINIARTISTSEARCH_ERROR,
    error,
  };
};

export const fetchMiniAlbumSearchPending = () => {
  return {
    type: actions.FETCH_MINIALBUMSEARCH_PENDING,
  };
};

export const fetchMiniAlbumSearchSuccess = (albums) => {
  return {
    type: actions.FETCH_MINIALBUMSEARCH_SUCCESS,
    albums,
  };
};

export const fetchMiniAlbumSearchError = (error) => {
  return {
    type: actions.FETCH_MINIALBUMSEARCH_ERROR,
    error,
  };
};

export const fetchMiniPlaylistSearchPending = () => {
  return {
    type: actions.FETCH_MINIPLAYLISTSEARCH_PENDING,
  };
};

export const fetchMiniPlaylistSearchSuccess = (playlists) => {
  return {
    type: actions.FETCH_MINIPLAYLISTSEARCH_SUCCESS,
    playlists,
  };
};

export const fetchMiniPlaylistSearchError = (error) => {
  return {
    type: actions.FETCH_MINIPLAYLISTSEARCH_ERROR,
    error,
  };
};
