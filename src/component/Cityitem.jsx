import { useCity } from "../contexts/CitiesProvider";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
const formate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function Cityitem({ city }) {
  const { currentCity, deletingCity } = useCity();
  const { cityName, date, emoji, id, position } = city;

  function handelClick(e) {
    e.preventDefault();
    deletingCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.cityName}>{cityName}</h3>
        <time className={styles.date}>{formate(date)}</time>
        <button className={styles.deleteBtn} onClick={handelClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default Cityitem;
