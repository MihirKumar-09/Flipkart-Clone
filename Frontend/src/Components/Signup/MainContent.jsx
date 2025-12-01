import { Link } from "react-router-dom";
import SecurityLogo from "../../assets/HomePage/security.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainContent() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/", {
          state: { justSignedUp: true, name: username, email: email },
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="main-content">
      <div className="container">
        <div className="left-side">
          <div>
            <h3>Looks like you're new here!</h3>
            <p>Sign up with your email to get started</p>
          </div>
          <img src={SecurityLogo} alt="Trusted" />
        </div>

        <div className="right-side">
          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              className="input-field"
              required
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              className="input-field"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder=" "
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder=" "
              name="password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>Confirm Password</label>
          </div>
          {error && <p className="error-msg">{error}</p>}{" "}
          <p>
            By continuing, you agree to Flipkart's{" "}
            <a
              target="_blank"
              href="https://www.flipkart.com/pages/terms"
              rel="noopener"
            >
              Terms of Use
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              href="https://www.flipkart.com/pages/privacypolicy"
              rel="noopener"
            >
              Privacy Policy
            </a>
            .
          </p>
          <button type="button" className="continue-btn" onClick={handleSignup}>
            CONTINUE
          </button>
          <Link to="/login">
            <button type="button" className="new-btn">
              Existing User? Log in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
