export interface Conversation {
  convoId: string;
  sent: { content: string; date: string }[];
  received: { userId: string; content: string; date: string }[];
}

export interface Friend {
  userId: string;
  firstname: string;
  lastname: string;
  username: string;
  bgColor: string;
}

export interface Room {
  roomId: string;
  members: string[];
}

export interface User extends Friend {
  password: string;
  email: string;
  friends: Friend[];
  conversations: Conversation[];
  rooms: Room[];
}

export interface Users {
  users: User[];
}

export const BaseSignUp = {
  friends: [],
  conversations: [],
  rooms: [],
};

export const emptyUser = {
  userId: "",
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  email: "",
  bgColor: "",
  friends: [],
  conversations: [],
  rooms: [],
};
