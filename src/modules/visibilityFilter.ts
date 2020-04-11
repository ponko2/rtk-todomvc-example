import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum VisibilityFilter {
  SHOW_ALL = 'show_all',
  SHOW_COMPLETED = 'show_completed',
  SHOW_ACTIVE = 'show_active',
}

const initialState = VisibilityFilter.SHOW_ALL;

const slice = createSlice({
  name: 'visibilityFilter',
  initialState,
  reducers: {
    setVisibilityFilter: (state, action: PayloadAction<VisibilityFilter>) =>
      action.payload,
  },
});

export const visibilityFilterReducer = slice.reducer;
export const { setVisibilityFilter } = slice.actions;
