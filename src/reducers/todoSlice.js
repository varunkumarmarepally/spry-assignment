import { createSlice } from '@reduxjs/toolkit'
import dummyList from '../utils/dummyList'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    setInitialTodos: (state, action) => {
      console.log(action)
      state.push(...action.payload);
      return state;
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
    removeTodo: (state, action) => {
      return state.filter((eachTodo) => {
        return eachTodo.id != action.payload.id
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTodo, updateTodo, removeTodo, setInitialTodos } = todoSlice.actions

export default todoSlice.reducer