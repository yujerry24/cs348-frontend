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

export const setSubSongs = songs => {
  return {
    type: actions.SET_SUB_SONGS,
    songs,
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

export const updateLikedInPlaylist = (playlistId, songId, isFavourite) => {
  return {
    type: actions.UPDATE_LIKED_IN_PLAYLIST,
    playlistId,
    songId,
    isFavourite,
  };
};

export const updateLikedInSearch = (songId, isFavourite) => {
  return {
    type: actions.UPDATE_LIKED_IN_SEARCH,
    songId,
    isFavourite,
  };
};

//////////////////

export const fetchSongSearchPending = () => {
  return {
    type: actions.FETCH_SONGSEARCH_PENDING,
  };
};

export const fetchSongSearchSuccess = (songs, count) => {
  return {
    type: actions.FETCH_SONGSEARCH_SUCCESS,
    songs,
    count,
  };
};

export const fetchSongSearchError = error => {
  return {
    type: actions.FETCH_SONGSEARCH_ERROR,
    error,
  };
};

export const fetchArtistSearchPending = () => {
  return {
    type: actions.FETCH_ARTISTSEARCH_PENDING,
  };
};

export const fetchArtistSearchSuccess = (artists, count) => {
  return {
    type: actions.FETCH_ARTISTSEARCH_SUCCESS,
    artists,
    count,
  };
};

export const fetchArtistSearchError = error => {
  return {
    type: actions.FETCH_ARTISTSEARCH_ERROR,
    error,
  };
};

export const fetchArtistSongsPending = () => {
  return {
    type: actions.FETCH_ARTIST_SONGS_PENDING,
  };
};

export const fetchArtistSongsSuccess = artistSongs => {
  return {
    type: actions.FETCH_ARTIST_SONGS_SUCCESS,
    artistSongs,
  };
};

export const fetchArtistSongsError = error => {
  return {
    type: actions.FETCH_ARTIST_SONGS_ERROR,
    error,
  };
};

export const fetchAlbumSearchPending = () => {
  return {
    type: actions.FETCH_ALBUMSEARCH_PENDING,
  };
};

export const fetchAlbumSearchSuccess = (albums, count) => {
  return {
    type: actions.FETCH_ALBUMSEARCH_SUCCESS,
    albums,
    count,
  };
};

export const fetchAlbumSearchError = error => {
  return {
    type: actions.FETCH_ALBUMSEARCH_ERROR,
    error,
  };
};

export const fetchAlbumSongsPending = () => {
  return {
    type: actions.FETCH_ALBUM_SONGS_PENDING,
  };
};

export const fetchAlbumSongsSuccess = albumSongs => {
  return {
    type: actions.FETCH_ALBUM_SONGS_SUCCESS,
    albumSongs,
  };
};

export const fetchAlbumSongsError = error => {
  return {
    type: actions.FETCH_ALBUM_SONGS_ERROR,
    error,
  };
};

export const fetchPlaylistSearchPending = () => {
  return {
    type: actions.FETCH_PLAYLISTSEARCH_PENDING,
  };
};

export const fetchPlaylistSearchSuccess = (playlists, count) => {
  return {
    type: actions.FETCH_PLAYLISTSEARCH_SUCCESS,
    playlists,
    count,
  };
};

export const fetchPlaylistSearchError = error => {
  return {
    type: actions.FETCH_PLAYLISTSEARCH_ERROR,
    error,
  };
};

export const fetchPlaylistSongsPending = () => {
  return {
    type: actions.FETCH_PLAYLIST_SONGS_PENDING,
  };
};

export const fetchPlaylistSongsSuccess = playlistSongs => {
  return {
    type: actions.FETCH_PLAYLIST_SONGS_SUCCESS,
    playlistSongs,
  };
};

export const fetchPlaylistSongsError = error => {
  return {
    type: actions.FETCH_PLAYLIST_SONGS_ERROR,
    error,
  };
};
