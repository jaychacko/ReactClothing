import React from "react";
import "./sign-in-sign-up.scss";
import SignIn from "../../components/singIn/sign-in";
import SignUp from '../../components/signup/signup.component'
const SignInAndSignUp = () => (
  <div className="sign-in-and-sign-up">
    <SignIn />
    <SignUp />

  </div>
);

export default SignInAndSignUp;
