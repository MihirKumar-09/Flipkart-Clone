import "../Signup/Signup.css";
import SecurityLogo from "../../assets/HomePage/security.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";

// Import React-Toastify;
import { ToastContainer, toast } from "react-toastify";

export default function MainContent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const { handleLogin, error, setError } = useAuth();

  const notify = () => {
    toast.success("Login Successfully", { autoClose: 3000 });
  };
  const login = async () => {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }
    const success = await handleLogin(username, password);
    if (success) {
      notify();
    }
  };

  return (
    <div className="main-content">
      <div className="container">
        <div className="left-side">
          <div>
            <h3>Login</h3>
            <p>Get access to your Orders, Wishlist and Recommendations</p>
          </div>
          <img src={SecurityLogo} alt="Security" />
        </div>

        <div className="right-side">
          <div className="input-group">
            <input
              type="text"
              placeholder=" "
              className="input-field"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder=" "
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  login();
                }
              }}
            />
            <label>Password</label>
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
              {error}
            </p>
          )}

          <p style={{ fontSize: "12px", color: "#878787", margin: "20px 0" }}>
            By continuing, you agree to Flipkart's{" "}
            <a
              href="https://www.flipkart.com/pages/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Use
            </a>
            <a
              href="https://www.flipkart.com/pages/privacypolicy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </p>

          <button
            type="button"
            className="continue-btn"
            onClick={() => {
              login();
            }}
          >
            CONTINUE
          </button>

          <div className="new-users">
            <Link to="/signup" className="link">
              <p className="new-user-text">
                New to Flipkart? Create an account
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
