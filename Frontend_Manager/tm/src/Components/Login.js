import React, { Component } from "react";
import "./Login.css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.username === "user" && this.state.password === "password") {
      this.setState({ isLoggedIn: true });
    } else {
      alert("Invalid username or password");
    }
  };

  render() {
    if (this.state.isLoggedIn) {
      return <p>Welcome, {this.state.username}!</p>;
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <img src="https://www.ldtech.in/images/logo.png" alt="Error" className="company-logo" style={{marginBottom: "20px"}} />
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Login" />
        </form>
      );
    }
  }
}

export default Login;
