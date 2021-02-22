import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "mohit@gmail.com",
    password: "123456",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  useEffect(() => {
    isAuth() && Router.push(`/`);
  });

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, error: "", loading: true });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          Router.push("/");
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? (
      <div className="alert alert-secondary" role="alert">
        Loading...
      </div>
    ) : (
      ""
    );

  const showError = () =>
    error ? (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    ) : (
      ""
    );

  const showMessage = () =>
    message ? (
      <div className="alert alert-primary" role="alert">
        {message}
      </div>
    ) : (
      ""
    );

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            className="form-control"
            onChange={handleChange("email")}
            placeholder="type your email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            className="form-control"
            onChange={handleChange("password")}
            placeholder="type your password"
          />
        </div>
        <div>
          <button className="btn btn-primary">Signin</button>
        </div>
      </form>
    );
  };
  return (
    <>
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && signinForm()}
    </>
  );
};

export default SigninComponent;
