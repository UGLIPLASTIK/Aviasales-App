import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async function (_, { rejectWithValue, dispatch }) {
  try {
    let searchId = await fetch('https://aviasales-test-api.kata.academy/search');
    if (!searchId.ok) {
      throw new Error("Can't get search ID.");
    }
    searchId = await searchId.json();
    dispatch(setSearchId(searchId));
    console.log(searchId);
    return searchId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const ticketsReducer = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loading: false,
    error: false,
    searchId: null,
  },
  reducers: {
    setSearchId(state, action) {
      state.searchId = action.payload.searchId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.searchId = action.payload;
    });
  },
});

const { setSearchId } = ticketsReducer.actions;
export default ticketsReducer;
