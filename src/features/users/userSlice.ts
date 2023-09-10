import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { Friend, PersonalInfo, User, UserSettings } from "../../app/userHook";
import axios from "axios";

// import.meta.env.VITE_URL = "http://localhost:3000";

interface InitialUserState {
  user?: User | null;
  users?: User[] | [];
  settings?: UserSettings;
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
      const response = await axios.get(import.meta.env.VITE_URL + "/users");
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
  async (user: { username: string; password?: string; userId?: string }) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL + "/users/login",
        user
      );
      const data = response.data;
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
    const response = await axios.post(
      import.meta.env.VITE_URL + "/users/signup",
      user
    );
    return response.data;
  } catch (err) {
    let message = "Unknown Error";
    if (err instanceof Error) message = err.message;
    return message;
  }
});

export const saveSocketSession = createAsyncThunk(
  "user/saveSocket",
  async (userSocket: { userId: string; socketId: string }) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL + "/socket/save-id",
        userSocket
      );
      return response.data;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      return message;
    }
  }
);

export const addNewFriend = createAsyncThunk(
  "user/addNewFriend",
  async (updatedUser: {
    user: User | {};
    friends: Friend[] | [];
    friend: Friend;
  }) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL + "/users/add-friend",
        updatedUser
      );
      console.log("good");
      return response.data;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      console.log("error");
      return message;
    }
  }
);

export const saveNewMessage = createAsyncThunk(
  "user/saveNewMessage",
  async (message: {
    to: string;
    from: string;
    content: string;
    date: string;
  }) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL + "/users/add-message",
        message
      );
      console.log(response.data);
      return response.data; // should return the new updated user
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      console.log("error");
      return message;
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (newInfo: PersonalInfo) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL + "/users/update-info",
        newInfo
      );
      return response.data;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      console.log("error");
      return message;
    }
  }
);

export const updateUserSettings = createAsyncThunk(
  "user/updateUserSettings",
  async (newSettings: UserSettings) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL + "/users/update-settings",
        newSettings
      );
      return response.data;
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      console.log("error");
      return message;
    }
  }
);

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
        state.user = action.payload.user;
        state.settings = action.payload.settings;
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
      })
      .addCase(addNewFriend.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(addNewFriend.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "error";
      })
      .addCase(saveNewMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveNewMessage.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
        state.status = "succeeded";
      });
  },
});

// Get USER data selecters
export const getUser = (state: RootState) => state.user.user;
export const getFriends = (state: RootState) =>
  [...(state.user.user?.friends || [])].sort((a, b) =>
    a.firstname.localeCompare(b.firstname)
  );
export const getFriendById = (state: RootState, userId: string) =>
  state.user.user?.friends.find((friend) => friend.userId === userId);
export const getConversations = (state: RootState) =>
  state.user.user?.conversations;
export const getRooms = (state: RootState) => state.user.user?.rooms;

export const getConvoFromRoomOrFriendId = (state: RootState, Id: string) =>
  state.user.user?.conversations.find((convo) => convo.convoId === Id);

// Get Users data
export const getAllUsers = (state: RootState) => state.user.users;

// Get status and error selecters
export const getUserStatus = (state: RootState) => state.user.status;
export const getUserError = (state: RootState) => state.user.error;
export const getuserSettings = (state: RootState) => state.user.settings;

export const { removeUser } = userSlice.actions;
export default userSlice.reducer;
