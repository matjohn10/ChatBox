import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface Messages {
  messages?: {
    content: string;
    date: string;
    userId: string;
  }[];
}
interface MessageObj {
  message: string;
}
const mainUser = nanoid();
const initialState: Messages = {
  messages: [
    {
      content: "Hello World!",
      date: new Date().toISOString(),
      userId: mainUser,
    },
  ],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<MessageObj>) {
      const { message } = action.payload;
      state.messages?.push({
        content: message,
        date: new Date().toISOString(),
        userId: mainUser,
      });

      console.log("here");
    },
  },
});

export const getMessages = (state: RootState) => state.messages.messages;
export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
