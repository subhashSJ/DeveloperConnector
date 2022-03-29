import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
import CreateProfile from "../profile_forms/CreateProfile";
import EditProfile from "../profile_forms/EditProfile";
import AddExperience from "../profile_forms/AddExperience";
import AddEducation from "../profile_forms/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";

const AllRoutes = () => {
  return (
    <section className="container">
      <Alert />
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profiles" element={<Profiles />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/dashboard" element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route exact path="/dashboard" element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route exact path="/create-profile" element={<PrivateRoute />}>
          <Route exact path="/create-profile" element={<CreateProfile />} />
        </Route>
        <Route exact path="/edit-profile" element={<PrivateRoute />}>
          <Route exact path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route exact path="/add-experience" element={<PrivateRoute />}>
          <Route exact path="/add-experience" element={<AddExperience />} />
        </Route>
        <Route exact path="/add-education" element={<PrivateRoute />}>
          <Route exact path="/add-education" element={<AddEducation />} />
        </Route>
        <Route exact path="/posts" element={<PrivateRoute />}>
          <Route exact path="/posts" element={<Posts />} />
        </Route>
        <Route exact path="/posts/:id" element={<PrivateRoute />}>
          <Route exact path="/posts/:id" element={<Post />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default AllRoutes;
