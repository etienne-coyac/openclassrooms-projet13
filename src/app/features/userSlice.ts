import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";

interface UserState {
  value: User | undefined;
}

const initialState: UserState = {
  value: undefined
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User | undefined>) => {
      state.value = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
