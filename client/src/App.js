import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile_forms/CreateProfile";
import EditProfile from "./components/profile_forms/EditProfile";
import AddExperience from "./components/profile_forms/AddExperience";
import AddEducation from "./components/profile_forms/AddEducation";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import Profiles from "./components/profiles/Profiles";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  //Adding [] in useEffect() means running useEffect only once
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profiles" element={<Profiles />} />
              <Route exact path="/dashboard" element={<PrivateRoute />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route exact path="/dashboard" element={<PrivateRoute />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route exact path="/create-profile" element={<PrivateRoute />}>
                <Route
                  exact
                  path="/create-profile"
                  element={<CreateProfile />}
                />
              </Route>
              <Route exact path="/edit-profile" element={<PrivateRoute />}>
                <Route exact path="/edit-profile" element={<EditProfile />} />
              </Route>
              <Route exact path="/add-experience" element={<PrivateRoute />}>
                <Route
                  exact
                  path="/add-experience"
                  element={<AddExperience />}
                />
              </Route>
              <Route exact path="/add-education" element={<PrivateRoute />}>
                <Route exact path="/add-education" element={<AddEducation />} />
              </Route>
            </Routes>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
