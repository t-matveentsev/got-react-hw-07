import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchData } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const initialState = {
  contact: {
    item: [],
    loading: false,
    error: null,
  },
};

export const selectContacts = (state) => state.contacts.contact.item;
export const selectLoading = (state) => state.contacts.contact.loading;
export const selectError = (state) => state.contacts.contact.error;

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
        state.contact.item = action.payload;
        state.contact.loading = false;
      })
      .addCase(fetchData.pending, (state) => {
        state.contact.loading = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.contact.loading = false;
        state.contact.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contact.item.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contact.item = state.contact.item.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const contactReducer = slice.reducer;
