import axios from 'axios';

export async function doesUrlExist(url) {
  return axios.get(url)
    .catch(() => false).then((response) => {
      if (!response || (response.status < 200 && response.status >= 300)) return false;
      return true;
    });
}
