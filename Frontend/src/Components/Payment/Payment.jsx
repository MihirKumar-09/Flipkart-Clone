import style from "./Payment.module.css";
import NavBar from "../../Components/Layout/AuthNavbar";
import PaymentOptions from "./PaymentOptions/Option";
import PriceDetails from "./PriceDetails/PriceDetails";
import OrderSummary from "./OrderSummary/OrderSummary";
export default function Payment(){
    return(
        <div >
            <NavBar/>
            <div className={style.Payment}>
                <div className={style.leftSection}>
                    <PaymentOptions/>
                    <OrderSummary/>
                </div>
                <div className={style.rightSection}>
                    <PriceDetails/>
                </div>
            </div>
        </div>
    )
}