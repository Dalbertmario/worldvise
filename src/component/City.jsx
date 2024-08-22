import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCity } from "../contexts/CitiesProvider";
import { useEffect, useState } from "react";
import Button from "./Button";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // TEMP DATA
  const Navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  // const [searchparams, setSearchParams] = useSearchParams();

  // const lat = searchparams.get("lat");
  // const lng = searchparams.get("lng");
  // console.log(lng);
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };
  const { getcity, currentCity } = useCity();
  const { emoji, cityName, date, notes, loading } = currentCity;
  useEffect(
    function () {
      getcity(id);
    },
    [id]
  );
  if (loading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
