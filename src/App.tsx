import MessagePage from "./features/messages/MessagePage";
import Layout from "./components/Layout";
import Test from "./components/Test";
import Login from "./features/users/Login";
import SignUp from "./features/users/SignUp";
import MoreInfo from "./features/users/MoreInfo";
import LoggedOut from "./components/LoggedOut";
import IndexPage from "./components/IndexPage";
import PrivateRoutes from "./components/PrivateRoutes";
import UserPage from "./features/users/UserPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io, Socket } from "socket.io-client";

//CSS
import "./css/index.css";
import "./css/credentials.css";
import "./css/profile.css";

const socket: Socket = io("http://localhost:3000", {
  autoConnect: false,
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/message-test" element={<MessagePage />} />
          <Route path="/test" element={<Test socket={socket} />} />

          <Route path="/login">
            <Route index element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signup+" element={<MoreInfo />} />
          </Route>
          <Route path="/logout" element={<LoggedOut />} />

          {/* Protected user routes */}
          <Route path="/user" element={<PrivateRoutes />}>
            <Route index element={<UserPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
