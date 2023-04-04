import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "./App.scss";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import Profilee from "./components/pages/Profilee";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={ isAuthenticated ? <Home/> : <Login/> }
          />

          <Route
            path="/login"
            element={isAuthenticated ? <Home /> : <Login />}
          />

          <Route
            path="/signup"
            element={isAuthenticated ? <Home /> : <Signup />}
          />

          <Route
            path="/account"
            element={isAuthenticated ? <Profilee /> : <Signup />}
          />

          {/* <Route
            path="/share"
            element={isAuthenticated ? <Share /> : <Signup />}
          /> */}

          <Route
            path="/user/:id"
            element={ isAuthenticated ? <Profile/> : <Login/>}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
