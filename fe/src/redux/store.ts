import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import gamesReducer from './game';
import playersReducer from './players';
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  game: gamesReducer,
  players: playersReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

export default store;