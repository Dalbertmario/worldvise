import Message from "./Message";
import styles from "./CountriesList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useCity } from "../contexts/CitiesProvider";

function CountriesList() {
  const { cities, loading } = useCity();
  if (loading) return <Spinner />;
  if (!cities.length) return <Message message="Add your First country" />;

  const countries = cities.reduce((arr, citu) => {
    if (!arr.map((el) => el.country).includes(citu.country))
      return [...arr, { country: citu.country, emoji: citu.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList} key={cities.key}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountriesList;
