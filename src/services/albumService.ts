import {API_BASE} from '@env';

export const getTopAlbums = () => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/top-albums`;
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

export const submitAlbum = ({token, payload}: any) => {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE}/api/v1/submit-album`;
    fetch(url, {
      method:"POST",
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
