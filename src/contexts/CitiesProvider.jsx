import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();
const initialItems = {
  cities: [],
  isloading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "rejected":
      return { ...state, isloading: false, error: action.payload };
    case "loading":
      return { ...state, isloading: true };
    case "cities/loaded":
      return { ...state, isloading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isloading: false, currentCity: action.payload };

    case "cities/created":
      return {
        ...state,
        isloading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "cities/deleted":
      return {
        ...state,
        isloading: false,
        cities: state.cities.filter((el) => el.id !== action.payload),
        currentCity: {},
      };
    default:
      throw new Error("Unknow action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isloading, currentCity }, dispatch] = useReducer(
    reducer,
    initialItems
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setLoading] = useState(false);
  // const [currentCity, setCurrentcity] = useState({});

  // console.log(cities);
  const BASE_URl = "http://localhost:9000";
  useEffect(function () {
    async function fetching() {
      dispatch({ type: "loading" });
      try {
        const data = await fetch(`${BASE_URl}/cities`);
        const res = await data.json();
        dispatch({ type: "cities/loaded", payload: res });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There is an error fetching the data",
        });
      }
    }
    fetching();
  }, []);
  async function getcity(id) {
    if (+id === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const data = await fetch(`${BASE_URl}/cities/${id}`);
      const res = await data.json();
      dispatch({ type: "city/loaded", payload: res });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There is an error fetching in current city",
      });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URl}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There is error in creating new city",
      });
    }
  }
  async function deletingCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URl}/cities/${id}`, { method: "DELETE" });
      dispatch({ type: "cities/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There is an error in deleting the city",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        loading: isloading,
        currentCity,
        getcity,
        createCity,
        deletingCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCity() {
  const data = useContext(CitiesContext);
  if (data === "undefined") throw new Error("asd");
  return data;
}
export { CitiesProvider, useCity };
