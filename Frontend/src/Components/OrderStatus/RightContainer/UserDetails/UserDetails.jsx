import style from "./UserDetails.module.css";
export default function UserDetails({ order }) {
  return (
    <div className={style.userDetails}>
      <h5>Delivery details</h5>
      <div className={style.details}>
        <div className={style.address}>
          <span>
            <i class="fa-regular fa-house"></i> <h6>Home</h6>
          </span>
          <span className={style.home}>{order.addressId.address}</span>
        </div>
        <hr style={{ margin: "0px", opacity: "0.1" }} />
        <div>
          <div className={style.address}>
            <span>
              <i class="fa-regular fa-user"></i> <h6>{order.addressId.name}</h6>
            </span>
            <span className={style.home}>{order.addressId.mobile}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
