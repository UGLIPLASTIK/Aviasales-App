import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async function (_, { rejectWithValue }) {
  try {
    const response = await fetch('https://aviasales-test-api.kata.academy/search');
    if (!response.ok) {
      throw new Error("Can't get search ID.");
    }
    const searchId = await response.json();
    return searchId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async function (searchId, { rejectWithValue }) {
  try {
    if (!searchId) return;
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
    if (!response.ok) {
      throw new Error("Can't get tickets.");
    }
    const result = await response.json();
    return result;
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
    visibleTickets: 5,
  },
  reducers: {
    addVisible(state) {
      if (state.tickets.length === 0) return;
      state.visibleTickets += 5;
    },
  },
  selectors: {
    searchId: (state) => state.searchId,
    tickets: (state) => state.tickets,
    visibleTickets: (state) => state.visibleTickets,
    loading: (state) => state.loading,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchId.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchSearchId.fulfilled, (state, action) => {
      state.searchId = action.payload.searchId;
    });
    builder.addCase(fetchTickets.pending, (state) => {
      state.error = false;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      const { tickets, stop } = action.payload;
      state.error = false;
      state.tickets = state.tickets.concat(tickets);
      if (stop) state.loading = false;
    });
    builder.addCase(fetchTickets.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { searchId, tickets, visibleTickets, loading } = ticketsReducer.selectors;
export const { addVisible } = ticketsReducer.actions;
export default ticketsReducer.reducer;
