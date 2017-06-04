import { combineReducers } from 'redux';

import catalog from './CatalogReducer';
import stories from './StoryReducer';

export default combineReducers({
  catalog,
  stories,
});
