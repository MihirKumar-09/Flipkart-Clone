import style from "./Gender.module.css";
export default function Gender() {
  return (
    <div className={style.gender}>
      <p>Your Gender</p>
      <div className={style.genderGroup}>
        <label className={style.genderOption}>
          <input type="radio" name="gender" value="male" />
          <span>Male</span>
        </label>

        <label className={style.genderOption}>
          <input type="radio" name="gender" value="female" />
          <span>Female</span>
        </label>
      </div>
    </div>
  );
}
