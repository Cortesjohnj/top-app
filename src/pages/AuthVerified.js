import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import history from "../history";
import { authUser } from "../store/actionCreators";

function AuthVerified() {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const { token } = useParams();
  // const {email, }

  const emailWasVerified = () => {
    MySwal.fire({
      title: <strong>Your email was successfully verified!</strong>,
      html: `<i>Redirected to home...</i>`,
      icon: "success",
    }).then(history.push("/"));

    // dispatch(
    //   authUser({
    //     email: formState.values.email || "",
    //     password: formState.values.password || "",
    //   })
    // );
  };

  const emailWasNotVerified = () =>
    MySwal.fire({
      title: <strong>Oops...!</strong>,
      html: <i>Something went wrong, try again later!</i>,
      icon: "error",
    });

  return <div>{token ? emailWasVerified() : emailWasNotVerified()}</div>;
}

export default AuthVerified;
