import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  searchTerm: string;
}

const initialState: ProductState = {
  searchTerm: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = productSlice.actions;
export default productSlice.reducer;
