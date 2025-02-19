import { createSlice } from '@reduxjs/toolkit';

const setFilter = (state, name) => {
  if (name === 'all' && state.all === false)
    return {
      all: true,
      0: true,
      1: true,
      2: true,
      3: true,
    };
  if (name === 'all' && state.all === true)
    return {
      all: false,
      0: false,
      1: false,
      2: false,
      3: false,
    };
  const newState = { ...state, [name]: !state[name] };
  if (Object.values(newState).slice(0, 4).includes(false)) return { ...newState, all: false };
  else return { ...newState, all: true };
};

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    filterStatus: {
      all: false,
      0: false,
      1: false,
      2: false,
      3: false,
    },
  },
  selectors: {
    filters: (state) => state.filterStatus,
  },
  reducers: {
    handleChange(state, action) {
      state.filterStatus = setFilter(state.filterStatus, action.payload);
    },
  },
});

export const { handleChange } = filterSlice.actions;
export const { filters } = filterSlice.selectors;
export default filterSlice.reducer;
