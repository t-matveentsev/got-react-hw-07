import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    name: "",
  },
};

export const selectNameFilter = (state) => state.filter.filter.name;

const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter.name = action.payload;
    },
  },
});

export const filterReducer = slice.reducer;
export const { changeFilter } = slice.actions;
