import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Random Hooks
import type { User } from "./userHook";
export const randomUsers = (users: User[] | undefined) => {
  if (users) {
    const max = users?.length - 1;
    let ind = Math.floor(Math.random() * max);
    let randomUsers: User[] = [];
    for (let i: number = 0; i < 15; i++) {
      randomUsers.push(users[ind]);
      ind = Math.floor(Math.random() * max);
    }
    return randomUsers;
  }
  return [];
};
