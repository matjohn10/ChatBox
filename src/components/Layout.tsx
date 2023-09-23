import { Outlet } from "react-router-dom";
import Header from "./Header";

interface Props {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Layout = ({ setIsMenuOpen }: Props) => {
  return (
    <>
      <Header setIsMenuOpen={setIsMenuOpen} />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
