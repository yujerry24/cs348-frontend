// process.env.REACT_APP_ENDPOINT = https://ancient-ceiling-278919.ue.r.appspot.com
const API = process.env.REACT_APP_ENDPOINT || 'http://localhost:8080';

export const fetchAllPlaylists = async (userId) => {
  return fetch(`${API}/playlist/list/${userId}`)
    .then(res => res.json());
}

export const search = async (text) => {
  return fetch(`${API}/song/${text}`)
    .then(res => res.json());
};

export const addSongs = async (songIds, playlistIds) => {
  return fetch(`${API}/playlist/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ songIds, playlistIds }),
  }).then(() => { console.log("Add Success") });
};

export const deleteSongs = async (songIds) => {
  return fetch(`${API}/playlist/${this.state.currentPlaylist}/${songIds}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ songIds: songIds }),
  }).then(() => { console.log("Add Success") });
};

export const fetchPlaylist = async (playlistId) => {
  return fetch(`${API}/playlist/${playlistId}`)
    .then(res => res.json());
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
  }).then(res => res.json())
}


