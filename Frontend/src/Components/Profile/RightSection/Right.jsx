import style from "./Right.module.css";
import PersonalInfo from "./PersonalInfo";
import Email from "./Email";
import MobileNumber from "./MobileNumber";
import FAQs from "./FAQs";
import Button from "./button";
export default function Right() {
  return (
    <div className={style.right}>
      <PersonalInfo />
      <Email />
      <MobileNumber />
      <FAQs />
      <Button />
    </div>
  );
}
