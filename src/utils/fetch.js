import fetch from 'isomorphic-fetch';

export default function goFetch (url, options) {
  return fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return Promise.resolve(response.json());
      }
      return response
        .json()
        .then(error =>
          Promise.reject({ status: response.status, response: error }),
        );
    })
    .catch(error => Promise.reject(error));
}
