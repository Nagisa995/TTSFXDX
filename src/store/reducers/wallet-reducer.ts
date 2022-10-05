import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWalletData {
  wallet: string;
  isWrongNetwork: boolean;
}

export const defaultWalletData: IWalletData = {
  wallet: "undefined",
  isWrongNetwork: false,
};

export const walletReducerSlice = createSlice({
  name: "walletData",
  initialState: defaultWalletData,
  reducers: {
    walletConnection(state, action: PayloadAction<string>) {
      state.wallet = action.payload;
    },
    networkCheck(state) {
      state.isWrongNetwork = !state.isWrongNetwork;
    },
  },
});

export default walletReducerSlice.reducer;
