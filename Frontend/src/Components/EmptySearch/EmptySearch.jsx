import style from "./EmptySearch.module.css";
import NoResultImg from "../../assets/EmptyResult/empty.jpg"; // use your image

export default function EmptySearchPage({ query }) {
  return (
    <div className={style.wrapper}>
      <img src={NoResultImg} alt="No results" className={style.image} />

      <h2>No results for "{query}"</h2>
      <p>Try searching for something else or explore other categories.</p>

      <button className={style.button} onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
}
