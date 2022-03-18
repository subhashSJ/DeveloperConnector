import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) =>
  !isAuthenticated && !loading ? <Navigate to="/login" /> : <Outlet />;

  PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
