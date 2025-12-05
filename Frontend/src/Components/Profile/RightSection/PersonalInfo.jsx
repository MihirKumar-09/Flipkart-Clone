import style from "./PersonalInfo.module.css";
import { useAuth } from "../../../Context/AuthContext";
import { useState } from "react";
export default function PersonalInfo() {
  const { user, updateUser } = useAuth();
  const [username, setUsername] = useState(user?.username || "");

  const handleSave = async () => {
    if (!username.trim()) return; //alow empty value;
    const res = await updateUser({ username });
    if (!res.success) {
      console.log(res.error);
      return;
    }
    console.log("Username update successfully");
  };
  return (
    <div className={style.personalInfo}>
      <h5>Personal Information</h5>
      <div>
        <input
          type="text"
          placeholder={user?.username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSave} disabled={!username.trim()}>
          Save
        </button>
      </div>
    </div>
  );
}
