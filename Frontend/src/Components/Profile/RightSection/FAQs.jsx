import style from "./FAQs.module.css";
export default function FAQs() {
  return (
    <div className={style.FAQs}>
      <h5>FAQs</h5>
      <div>
        <h6>What happens when I update my email address (or mobile number)?</h6>
        <p>
          Your login email id (or mobile number) changes, likewise. You'll
          receive all your account related communication on your updated email
          address (or mobile number).
        </p>
      </div>

      <div>
        <h6>
          When will my Flipkart account be updated with the new email address
          (or mobile number)?
        </h6>
        <p>
          It happens as soon as you confirm the verification code sent to your
          email (or mobile) and save the changes.
        </p>
      </div>
      <div>
        <h6>
          What happens to my existing Flipkart account when I update my email
          address (or mobile number)?
        </h6>
        <p>
          Updating your email address (or mobile number) doesn't invalidate your
          account. Your account remains fully functional. You'll continue seeing
          your Order history, saved information and personal details.
        </p>
      </div>
      <div>
        <h6>
          Does my Seller account get affected when I update my email address?
        </h6>
        <p>
          Flipkart has a 'single sign-on' policy. Any changes will reflect in
          your Seller account also.
        </p>
      </div>
    </div>
  );
}
