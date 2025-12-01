import style from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.left}>
        <span>Policies: </span>
        <a href="#">Returns Policy</a>
        <span> | </span>
        <a href="#">Terms of Use</a>
        <span> | </span>
        <a href="#">Security</a>
        <span> | </span>
        <a href="#">Privacy</a>
      </div>

      <div className={style.right}>© 2007–2025 Flipkart.com</div>
    </div>
  );
}
