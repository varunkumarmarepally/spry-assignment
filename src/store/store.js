import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../reducers/todoSlice';
import uiReducer from '../reducers/uiSlice';

export default configureStore({
  reducer: {
    todos: todoReducer,
    ui: uiReducer
  },
})