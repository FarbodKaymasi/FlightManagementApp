import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flights: [],
};

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    addFlight: (state, action) => {
      state.flights.push(action.payload);
    },
    deleteFlight: (state, action) => {
      state.flights = state.flights.filter(flight => flight.flightNumber !== action.payload);
    },
    updateFlight: (state, action) => {
      const index = state.flights.findIndex(flight => flight.flightNumber === action.payload.flightNumber);
      if (index !== -1) {
        state.flights[index] = { ...state.flights[index], ...action.payload };
      }
    },
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    selectFlights: (state) => state.flights,
  },
});

export const { addFlight, deleteFlight, updateFlight, setFlights, selectFlights } = flightsSlice.actions;

export default flightsSlice.reducer;
