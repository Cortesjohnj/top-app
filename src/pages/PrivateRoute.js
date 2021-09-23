import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { AUTHENTICATED, LOADING } from "../store/actions";

function PrivateRoute({ component: Component, ...rest }) {
  const status = useSelector((state) => state.status);

  if (status === LOADING) return <p>Loading ....</p>;

  return (
    <Route
      {...rest}
      render={(props) =>
        status === AUTHENTICATED ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;
