import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "../axios";
import history from "../history";
import { authUser, verifiedEmail } from "../store/actionCreators";

function AuthVerified() {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const { token } = useParams();
  // const { active } = useSelector(state => state.user);

  // const [userVerified, setUserVerified] = useState( false );

  useEffect(() => {
    axios
      .get(`http://localhost:8080/verified/${token}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
      });
    // setUserVerified(prevState => ({
    //   ...prevState,
    //   active: true,
    // }));
  }, [token]);

  const emailWasVerified = () => {
    MySwal.fire({
      title: <strong>Your email was successfully verified!</strong>,
      html: `<i>Redirected to home...</i>`,
      icon: "success",
    }).then(function () {
      dispatch(verifiedEmail());
    });
  };
  return <div>{emailWasVerified()}</div>;
}

export default AuthVerified;
