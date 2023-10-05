import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Socket } from "socket.io-client";

interface Props {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
}

const Layout = ({ setIsMenuOpen, socket }: Props) => {
  return (
    <>
      <Header setIsMenuOpen={setIsMenuOpen} socket={socket} />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
