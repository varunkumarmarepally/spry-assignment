import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDialogOpen: false,
    dialogComponent: '',
    currentEditTask: {},
    currentTaskFilter: 'ALL_TASKS',
    currentSortFilter: ''
  },
  reducers: {
    openDialog: (state, action) => {
        return {
          ...state,
          isDialogOpen: true,
          ...action.payload
        }
    } ,
    closeDialog: (state) => {
        state.isDialogOpen = false;
        state.dialogComponent = '';
        state.currentEditTask = {};
    },
    updateUiState: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { openDialog, closeDialog, updateUiState } = uiSlice.actions

export default uiSlice.reducer