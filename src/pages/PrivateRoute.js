import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { AUTHENTICATED } from "../store/actions";

function PrivateRoute({ component: Component, ...rest }) {
  const status = useSelector(state => state.status);
  console.log(status);

  return (
    <Route
      {...rest}
      render={props =>
        status === AUTHENTICATED ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
