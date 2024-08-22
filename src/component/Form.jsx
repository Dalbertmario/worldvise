// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { UsePosition } from "./hooks/UsePosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCity } from "../contexts/CitiesProvider";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = UsePosition();
  const [isLoading, setIsloading] = useState(false);
  const [emoji, setemoji] = useState();
  const [geocodingError, setgeoCodingError] = useState("");
  const { createCity, isLoadings } = useCity();

  useEffect(
    function () {
      if (!lat && lng) return;
      async function fetchingData() {
        try {
          setIsloading(true);
          setgeoCodingError("");
          const data = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const res = await data.json();
          if (!res.countryCode) {
            throw new Error(
              "That doesn't seem to be a city .Click somewhere else"
            );
          }
          setCityName(res.city || res.locality || "");
          setCountry(res.countryName);
          setemoji(convertToEmoji(data.cityName));
        } catch (err) {
          setgeoCodingError(err.message);
        } finally {
          setIsloading(false);
        }
      }
      fetchingData();
    },
    [lat, lng]
  );
  // if (geocodingError) return <Message message={geocodingError} />;
  if (isLoading) return <Spinner />;
  if (!lat && !lng)
    return <Message message="Start by clicking somewhere in the map" />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate(-1);
  }

  return (
    <form
      className={`${styles.form} ${isLoadings ? styles.loading : ""} `}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
