import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import AllRoutes from "./components/routing/AllRoutes";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="*" element={<AllRoutes />} />
          </Routes>
        </>
      </Router>
    </Provider>
  );
};

export default App;
