// process.env.REACT_APP_ENDPOINT = https://ancient-ceiling-278919.ue.r.appspot.com
const API = process.env.REACT_APP_ENDPOINT || 'http://localhost:8080';

export const fetchAllPlaylists = async userId => {
  return fetch(`${API}/playlist/list/${userId}`).then(res => res.json());
};

export const search = async text => {
  return fetch(`${API}/song/search/${text}`).then(res => res.json());
};

export const addSongs = async (songIds, playlistIds) => {
  return fetch(`${API}/playlist/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ songIds, playlistIds }),
  }).then(() => {
    console.log('Add Success');
  });
};

export const deleteSongs = async (songIds, playlistId) => {
  return fetch(`${API}/playlist/remove/${playlistId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ songIds: songIds }),
  }).then(() => {
    console.log('Delete Success');
  });
};

export const fetchPlaylist = async playlistId => {
  return fetch(`${API}/playlist/${playlistId}`).then(res => res.json());
};

export const fetchMostPopularSongs = async () => {
  return fetch(`${API}/song/popularSongs`).then(res => res.json());
};

export const fetchMostPopularArtists = async () => {
  return fetch(`${API}/song/popularArtists`).then(res => res.json());
};

export const createPlaylist = async (name, userId) => {
  return fetch(`${API}/playlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      playlistName: name,
      userId: userId,
    }),
  }).then(res => res.json());
};

export const deletePlaylist = async playlistId => {
  return fetch(`${API}/playlist/${playlistId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  }).then(res => res);
};

export const findUser = async name => {
  return fetch(`${API}/user/${name}`).then(res => res.json());
};

export const createUser = async name => {
  return fetch(`${API}/user/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ userId: name }),
  }).then(res => res.json());
};
