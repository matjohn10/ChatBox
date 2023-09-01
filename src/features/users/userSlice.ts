import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { User } from "../../app/userHook";
import axios from "axios";

const SERVER_URL = "http://localhost:3000";

interface InitialUserState {
  user?: User | null;
  users?: User[] | [];
  status: string;
  error: undefined | string;
}

const initialState: InitialUserState = {
  status: "idle",
  error: undefined,
}; // whatever is fetched from DB at login

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    try {
      const response = await axios.get(SERVER_URL + "/users");
      const data = response.data;
      return data;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      return message;
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (user: { username: string; password: string }) => {
    try {
      const response = await axios.post(SERVER_URL + "/users/login", user);
      const data = response.data[0];
      return data;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      return message;
    }
  }
);

export const addUser = createAsyncThunk("user/addUser", async (user: User) => {
  try {
    const response = await axios.post(SERVER_URL + "/users/signup", user);
    return response.data;
  } catch (err) {
    let message = "Unknown Error";
    if (err instanceof Error) message = err.message;
    return message;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      });
  },
});

// Get USER data selecters
export const getUser = (state: RootState) => state.user.user;
export const getFriends = (state: RootState) => state.user.user?.friends;
export const getFriendById = (state: RootState, userId: string) =>
  state.user.user?.friends.find((friend) => friend.userId === userId);
export const getConversations = (state: RootState) =>
  state.user.user?.conversations;
export const getRooms = (state: RootState) => state.user.user?.rooms;

export const getConvoFromRoomId = createSelector(
  [getConversations, (roomId: string) => roomId],
  (conversation, roomId) =>
    conversation?.find((convo) => convo.convoId === roomId)
);

// Get Users data
export const getAllUsers = (state: RootState) => state.user.users;

// Get status and error selecters
export const getUserStatus = (state: RootState) => state.user.status;
export const getUserError = (state: RootState) => state.user.error;

export const { removeUser } = userSlice.actions;
export default userSlice.reducer;
