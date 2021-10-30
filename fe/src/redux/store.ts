import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

// Reducer imports
import gamesReducer from './game';
import playersReducer from './players';


// Root reducer
const rootReducer = combineReducers({
  game: gamesReducer,
  players: playersReducer
});

// Root state type
export type RootState = ReturnType<typeof rootReducer>;

// Redux store
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

export default store;