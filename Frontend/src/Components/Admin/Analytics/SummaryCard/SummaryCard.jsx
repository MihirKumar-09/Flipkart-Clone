import style from "./Summary.module.css";
export default function SummaryCard({ title, value }) {
  return (
    <div className={style.card}>
      <h3>{title}</h3>
      <h4>{value}</h4>
    </div>
  );
}
