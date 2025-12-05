import style from "./MobileNumber.module.css";
import { useAuth } from "../../../Context/AuthContext";
import { useState, useEffect } from "react";
export default function MobileNumber() {
  const { user, updateUser } = useAuth();
  const [mobile, setMobile] = useState(user?.mobile || "");

  const handleSave = async () => {
    if (!mobile.trim()) return;
    const res = await updateUser({ mobile });
    if (!res.success) {
      console.log(res.error);
      return;
    }
    console.log("Mobile Number update successfully");
  };

  return (
    <div className={style.mobileNumber}>
      <h5>Mobile Number</h5>
      <div>
        <input
          type="text"
          placeholder={user?.mobile}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button onClick={handleSave} disabled={!mobile.trim()}>
          Save
        </button>
      </div>
    </div>
  );
}
