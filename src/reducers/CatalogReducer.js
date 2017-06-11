import {
  GET_CATALOG_REQUEST,
  GET_CATALOG_SUCCESS,
  GET_CATALOG_FAILURE,
  CHANGE_PAGE_NUMBER,
} from 'actions/HackerNewsActions';

export const ITEMS_PER_PAGE = 30;

import { PENDING, SUCCESS, FAILURE } from 'utils/asyncStatus';

export default function Stories (state = {}, action) {
  switch (action.type) {
    case GET_CATALOG_REQUEST:
      return Object.assign({}, state, {
        [action.payload.req.type]: { asyncStatus: PENDING, data: [] },
      });

    case GET_CATALOG_SUCCESS:
      return Object.assign({}, state, {
        [action.payload.req.type]: {
          asyncStatus: SUCCESS,
          page: 1,
          totalPages: Math.ceil(action.payload.res.length / ITEMS_PER_PAGE),
          data: action.payload.res,
        },
      });

    case GET_CATALOG_FAILURE:
      return Object.assign({}, state, {
        [action.payload.req.type]: { asyncStatus: FAILURE },
      });

    case CHANGE_PAGE_NUMBER:
      return Object.assign({}, state, {
        [action.payload.req.type]: {
          ...state[action.payload.req.type],
          page: action.payload.req.page,
        },
      });

    default:
      return state;
  }
}
