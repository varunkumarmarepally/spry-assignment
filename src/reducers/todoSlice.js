import { createSlice } from '@reduxjs/toolkit'
import dummyList from '../utils/dummyList'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [...dummyList],
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value += 1
    },
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    updateTodo: (state, action) => {
      return state.map((eachTodo) => {
        if(eachTodo.id == action.payload.id) {
          return {
            ...eachTodo,
            ...action.payload
          }
        }
        return eachTodo;
      })
    },
    deleteTodo: (state, action) => {
      return state.filter((eachTodo) => {
        return eachTodo.id != action.payload.id
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer