import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import sortingReducer from './sortingSlice';
import ticketsReducer from './ticketsSlice';

const loggerMiddleware = (store) => (next) => (action) => {
  console.log(store.getState());
  console.log('Действие:', action);
  return next(action);
};

export default configureStore({
  reducer: {
    filters: filterReducer,
    sorting: sortingReducer,
    tickets: ticketsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});
