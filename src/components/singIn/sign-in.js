import React from "react";

import "./sign-in.scss";

import FormInput from "../../components/forminput/form-input-component";
import CustomButton from "../../components/custom-buttom/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.util";
class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const {email,password} = this.state;

    try{
      await auth.signInWithEmailAndPassword(email,password)
      this.setState({ email: "", password: "" });

    }catch(e){

      console.log(e)

    }

  };

  render() {
    return (
      <div className="sign-in">
        <h2>i already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="Email"
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            label="Password"
            handleChange={this.handleChange}
          />
          <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign In With Google
          </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
