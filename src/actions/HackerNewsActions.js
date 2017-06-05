import createActionCreator from 'utils/createActionCreator';
import api from '../api/HackerNewsApi';

export const GET_CATALOG_REQUEST = 'GET_CATALOG_REQUEST';
export const GET_CATALOG_SUCCESS = 'GET_CATALOG_SUCCESS';
export const GET_CATALOG_FAILURE = 'GET_CATALOG_FAILURE';

export const GET_STORY_DETAIL_REQUEST = 'GET_STORY_DETAIL_REQUEST';
export const GET_STORY_DETAIL_SUCCESS = 'GET_STORY_DETAIL_SUCCESS';
export const GET_STORY_DETAIL_FAILURE = 'GET_STORY_DETAIL_FAILURE';

export const fetchCatalog = createActionCreator(
  [GET_CATALOG_REQUEST, GET_CATALOG_SUCCESS, GET_CATALOG_SUCCESS],
  api.getStories,
);

export const fetchStoryDetail = createActionCreator(
  [
    GET_STORY_DETAIL_REQUEST,
    GET_STORY_DETAIL_SUCCESS,
    GET_STORY_DETAIL_SUCCESS,
  ],
  api.getStoryDetail,
);
