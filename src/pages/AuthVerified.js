import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { verifiedEmail } from "../store/actionCreators";

function AuthVerified() {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const { token } = useParams();

  useEffect(() => {
    dispatch(verifiedEmail(token));
  }, [token, dispatch]);

  const emailWasVerified = () => {
    MySwal.fire({
      title: <strong>Your email was successfully verified!</strong>,
      html: `<i>Redirected to home...</i>`,
      icon: "success",
    });
  };
  return <div>{emailWasVerified()}</div>;
}

export default AuthVerified;
