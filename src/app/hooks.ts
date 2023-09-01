import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Socket Hooks
// import { io } from "socket.io-client";
// import React from "react";
// import { Socket } from "socket.io-client/debug";
// const SOCKET_URL = "http://localhost:3000";
// export const socket = io(SOCKET_URL, { autoConnect: false });
// export const SocketContext = React.createContext<Socket>(new Socket(""));
