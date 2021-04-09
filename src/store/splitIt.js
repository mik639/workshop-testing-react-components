import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSplitIt = createAsyncThunk("splitIt", () =>
  fetch("https://glassesusa.com/api/splitIt").then((res) => res.json())
);

export const splitIt = createSlice({
  name: "splitIt",
  initialState: {
    status: "idle",
    installments: null,
    minTotal: null
  },
  extraReducers: {
    [fetchSplitIt.pending]: (state) => {
      state.status = "pending";
    },
    [fetchSplitIt.fulfilled]: (state, action) => {
      const { installments, minTotal } = action.payload;
      state.status = "fulfilled";
      state.installments = Number(installments);
      state.minTotal = Number(minTotal);
    },
    [fetchSplitIt.rejected]: (state) => {
      state.status = "rejected";
    }
  }
});
