import { useState } from "react";
import { registerUser } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.endsWith("@rbunagpur.in")) {
      alert("Only @rbunagpur.in email is allowed");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);

      await registerUser(formData);

      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>🎬 VideoHub</h1>

        <p>Create your account</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
          />

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
            Register
          </button>

        </form>

        <p>

          Already Registered?

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;