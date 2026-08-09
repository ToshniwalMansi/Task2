import { useState } from "react";
import { loginUser } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);

      const response = await loginUser(formData);

      localStorage.setItem(
        "token",
        response.data.data.accessToken
      );

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>🎬 VideoHub</h1>

        <p>Login to continue</p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>

          New User?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;