export interface PersonalInfo {
  newUsername?: string;
  newEmail?: string;
  newPassword?: string;
  bgColor?: string;
}

export interface UserSettings {
  userId: string | undefined;
  isDarkMode: boolean;
  bgColor: string | undefined;
}

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

export interface FriendsLetters {
  A: Friend[];
  B: Friend[];
  C: Friend[];
  D: Friend[];
  E: Friend[];
  F: Friend[];
  G: Friend[];
  H: Friend[];
  I: Friend[];
  J: Friend[];
  K: Friend[];
  L: Friend[];
  M: Friend[];
  N: Friend[];
  O: Friend[];
  P: Friend[];
  Q: Friend[];
  R: Friend[];
  S: Friend[];
  T: Friend[];
  U: Friend[];
  V: Friend[];
  W: Friend[];
  X: Friend[];
  Y: Friend[];
  Z: Friend[];
}

export const friendLetterObj = (friends: Friend[]) => {
  let letterObj: FriendsLetters = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: [],
    J: [],
    K: [],
    L: [],
    M: [],
    N: [],
    O: [],
    P: [],
    Q: [],
    R: [],
    S: [],
    T: [],
    U: [],
    V: [],
    W: [],
    X: [],
    Y: [],
    Z: [],
  };
  for (let i = 0; i < friends.length; i++) {
    const friendNameLetter = friends[i].firstname.slice(0, 1);
    letterObj[friendNameLetter.toUpperCase() as keyof typeof letterObj] = [
      ...letterObj[friendNameLetter.toUpperCase() as keyof typeof letterObj],
      friends[i],
    ];
  }
  return letterObj;
};

export const updateCssSettings = (
  mode: boolean,
  styles: CSSStyleDeclaration
) => {
  if (mode) {
    styles.setProperty("--text-light", "#fdfdfc");
    styles.setProperty("--text-dark", "#203136");
    styles.setProperty("--background", "#373d47");
    styles.setProperty("--background-dark", "#0a1d37");
    styles.setProperty("--btn-light", "#acbec7");
    styles.setProperty("--btn-dark", "#303a40");
    styles.setProperty("--accent", "#405e6d");
  } else {
    styles.setProperty("--text-light", "#fdfdfc");
    styles.setProperty("--text-dark", "#0d1011");
    styles.setProperty("--background", "#fdfdfc");
    styles.setProperty("--background-dark", "#042d64");
    styles.setProperty("--btn-light", "#d0d8dc");
    styles.setProperty("--btn-dark", "#303a40");
    styles.setProperty("--accent", "#658393");
  }
};
