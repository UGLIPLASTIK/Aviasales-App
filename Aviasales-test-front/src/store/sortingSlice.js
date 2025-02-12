import { createSlice } from '@reduxjs/toolkit';

const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {
    cheap: true,
    fast: false,
    optimal: false,
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
export default sortingSlice.reducer;
