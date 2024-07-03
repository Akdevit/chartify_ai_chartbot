import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './redux/Feture';
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    chat: store.getState().chat,
  });
});

export default store;
