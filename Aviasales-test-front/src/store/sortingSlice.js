import { createSlice } from '@reduxjs/toolkit';

const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {
    cheap: true,
    fast: false,
    optimal: false,
  },
  selectors: {
    sorting: (state) => state,
  },
  reducers: {
    handleSortChange(state, action) {
      for (const key in state) {
        key === action.payload ? (state[key] = true) : (state[key] = false);
      }
    },
  },
});

export const { handleSortChange } = sortingSlice.actions;
export const { sorting } = sortingSlice.selectors;
export default sortingSlice.reducer;
