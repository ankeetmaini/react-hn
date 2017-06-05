import {
  GET_STORY_DETAIL_SUCCESS,
  GET_STORY_DETAIL_REQUEST,
} from 'actions/HackerNewsActions';

import { PENDING, SUCCESS } from 'utils/asyncStatus';

export default function Story (state = {}, action) {
  switch (action.type) {
    case GET_STORY_DETAIL_REQUEST:
      return Object.assign({}, state, {
        [action.payload.req.id]: {
          asyncStatus: PENDING,
        },
      });

    case GET_STORY_DETAIL_SUCCESS: {
      const type = action.payload.req.type;
      const id = action.payload.req.id;
      return Object.assign({}, state, {
        [id]: {
          asyncStatus: SUCCESS,
          id,
          ...action.payload.res,
          type,
        },
      });
    }

    default:
      return state;
  }
}
