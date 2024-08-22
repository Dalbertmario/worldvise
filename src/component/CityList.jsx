import Cityitem from "./Cityitem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCity } from "../contexts/CitiesProvider";

function CityList() {
  const { cities, loading } = useCity();
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  if (loading) return <Spinner />;
  return (
    <ul className={styles.cityList} key={cities.key}>
      {cities.map((el) => (
        <Cityitem city={el} key={cities.CityName} />
      ))}
    </ul>
  );
}

export default CityList;
