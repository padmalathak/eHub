import axios from "axios";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login({ setIsUserLoggedIn }) {
  const responseMessage = (response) => {
    localStorage.setItem("token", response.credential);
    setIsUserLoggedIn(true);
    navigate("/dashboard");
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  const navigate = useNavigate();
  let baseURL = "http://localhost:8081/login";
  const handleLogin = async (e) => {
    e.preventDefault();
    const reqbody = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await axios.post(baseURL, reqbody);
      localStorage.setItem("token", response.data.token);
      setIsUserLoggedIn(true);
      console.log(response.data);
      const user = jwtDecode(response.data.token);
      console.log(user.role);
      if (user.role === "super_admin" || user.role === "read_only_admin") {
        navigate("/");
      } else if (user.role === "user") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card">
      <h1>Welcome Back!</h1>
      <h3>Enter Login Details</h3>
      <form className="card__form" onSubmit={handleLogin}>
        <div className="card__wrapper">
          <label className="card__label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="card__input"
            required
          />
        </div>
        <div className="card__wrapper">
          <label className="card__label">Password</label>

          <input
            type="password"
            name="password"
            id="password"
            className="card__input"
            required
          />
        </div>
        <button className="card__button" name="submit">
          Submit
        </button>
      </form>
      <GoogleOAuthProvider clientId="740058383309-0527pnk7vlk5cl5ajt1lnd2abd311an0.apps.googleusercontent.com">
      <div>
        <div style={{'text-align-last': 'center'}}>
        <h3>OR</h3>
        </div>
        
        <br />
        <br />
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Login;
