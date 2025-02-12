import { createSlice } from '@reduxjs/toolkit';

const setFilter = (state, name) => {
  if (name === 'all' && state.all === false)
    return {
      all: true,
      noOne: true,
      one: true,
      two: true,
      three: true,
    };
  if (name === 'all' && state.all === true)
    return {
      all: false,
      noOne: false,
      one: false,
      two: false,
      three: false,
    };
  const newState = { ...state, [name]: !state[name] };
  if (Object.values(newState).slice(1).includes(false)) return { ...newState, all: false };
  else return { ...newState, all: true };
};

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    filterStatus: {
      all: false,
      noOne: false,
      one: false,
      two: false,
      three: false,
    },
  },
  reducers: {
    handleChange(state, action) {
      state.filterStatus = setFilter(state.filterStatus, action.payload);
    },
  },
});

export const { handleChange } = filterSlice.actions;
export default filterSlice.reducer;
