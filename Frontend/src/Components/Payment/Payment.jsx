import style from "./Payment.module.css";
import NavBar from "../../Components/Layout/AuthNavbar";
export default function Payment(){
    return(
        <div >
            <NavBar/>
            <div className={style.payment}>
                
            </div>
        </div>
    )
}