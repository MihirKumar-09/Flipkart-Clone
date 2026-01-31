import style from "./Summary.module.css";
export default function SummaryCard({ title, value }) {
  return (
    <div className={style.card}>
      <h4>{title}</h4>
      <h5>{value}</h5>
    </div>
  );
}
