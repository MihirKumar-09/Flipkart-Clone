import style from "./Right.module.css";
import PersonalInfo from "./PersonalInfo";
import Gender from "./Gender";
import Email from "./Email";
import MobileNumber from "./MobileNumber";
import FAQs from "./FAQs";
import Button from "./button";
export default function Right() {
  return (
    <div className={style.right}>
      <PersonalInfo />
      <Gender />
      <Email />
      <MobileNumber />
      <FAQs />
      <Button />
    </div>
  );
}
