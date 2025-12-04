import style from "./OtherInfo.module.css";
export default function OtherInfo() {
  return (
    <div className={style.otherInfo}>
      <div className={style.myOrder}>
        <span>
          <i className={`fa-solid fa-file-arrow-up ${style.upload}`}></i>
          <h6>MY ORDERS</h6>
        </span>
        <i className={`fa-solid fa-angle-right ${style.next}`}></i>
      </div>

      {/* Account Setting */}
      <div className={style.accountSetting}>
        <div className={style.account}>
          <i class={`fa-solid fa-user`}></i>
          <h6>ACCOUNT SETTINGS</h6>
        </div>
        <div className={style.info}>
          <p>Profile Information</p>
          <p>Manage Address</p>
          <p>PAN CARD Information</p>
        </div>
      </div>

      {/* Payments */}
      <div className={style.accountSetting}>
        <div className={style.account}>
          <i class={`fa-solid fa-user`}></i>
          <h6>PAYMENTS</h6>
        </div>
        <div className={style.info}>
          <p>Gift Cards</p>
          <p>Saved UPI</p>
          <p>Saved Cards</p>
        </div>
      </div>

      {/* LogOut */}
      <div>
        <div className={style.logout}>
          <i className={`fa-solid fa-power-off`}></i>
          <h6>LOGOUT</h6>
        </div>
      </div>
    </div>
  );
}
