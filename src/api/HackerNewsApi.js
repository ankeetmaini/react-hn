import fetch from 'utils/fetch';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export default {
  getStories ({ type }) {
    return fetch(`${BASE_URL}/${type}.json`);
  },

  getStoryDetail ({ id }) {
    return fetch(`${BASE_URL}/item/${id}.json`);
  },
};
