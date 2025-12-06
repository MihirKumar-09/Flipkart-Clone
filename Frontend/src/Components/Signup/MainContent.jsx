import { Link } from "react-router-dom";
import SecurityLogo from "../../assets/HomePage/security.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";

export default function MainContent() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // create react-toastify
  const notify = () => {
    toast.success("Signup Successfully", { autoClose: 3000 });
  };

  const navigate = useNavigate();
  const { handleSignup, error, setError } = useAuth();

  const signUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("Please enter the details");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter correct email address");
      return;
    }
    if (username.length < 3) {
      setError("Username must have at least 3 characters");
      return;
    }

    const success = await handleSignup(
      username,
      email,
      password,
      confirmPassword
    );

    if (success) {
      navigate("/");
      notify();
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
          {error && <p className="error-msg">{error}</p>}
          <p>
            By continuing, you agree to Flipkart's
            <a
              target="_blank"
              href="https://www.flipkart.com/pages/terms"
              rel="noopener"
            >
              Terms of Use
            </a>
            and
            <a
              target="_blank"
              href="https://www.flipkart.com/pages/privacypolicy"
              rel="noopener"
            >
              Privacy Policy
            </a>
            .
          </p>
          <button type="button" className="continue-btn" onClick={signUp}>
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
