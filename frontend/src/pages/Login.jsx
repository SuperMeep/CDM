import { useState } from "react";
import usePasswordToggle from "../components/PasswordInput";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [PasswordInputType, ToggleIcon, toggleVisibility] = usePasswordToggle();
  return (
    <div className="login">
      <section className="heading">
        <p>image</p>
        <h2> Hello CDMian, welcome back!</h2>
      </section>

      <section className="form">
        <form
          className="login"
          // onSubmit={onSubmit}
        >
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type={PasswordInputType}
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
            <span onClick={toggleVisibility} className="password-toggle-icon">
              {ToggleIcon}
            </span>
          </div>

          <button type="submit" className="bn632-hover bn26">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
