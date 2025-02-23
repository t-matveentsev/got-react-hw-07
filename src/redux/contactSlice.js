import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchData } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const initialState = {
  contact: [],
  loading: false,
  error: null,
};

export const selectContacts = (state) => state.contacts.contact;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    const filteredContacts = contacts.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  }
);

const slice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.contact = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contact.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contact = state.contact.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const contactReducer = slice.reducer;
