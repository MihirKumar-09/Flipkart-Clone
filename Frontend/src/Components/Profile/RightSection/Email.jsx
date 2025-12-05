import style from "./Email.module.css";
import { useAuth } from "../../../Context/AuthContext";
import { useState } from "react";
export default function Email() {
  const { user, updateUser } = useAuth();
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = async () => {
    if (!email.trim()) return;
    const res = await updateUser({ email });
    if (!res.success) {
      console.log(res.error);
      return;
    }
    console.log("Email update successfully");
  };
  return (
    <div className={style.email}>
      <h5>Email Address</h5>
      <div>
        <input
          type="text"
          placeholder={user?.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSave} disabled={!email.trim()}>
          Save
        </button>
      </div>
    </div>
  );
}
