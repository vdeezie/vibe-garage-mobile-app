import {API_BASE} from '@env';

export const getRecentlyPublicPlaylist = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/public-playlist`;
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};