import { createContext, useContext, useReducer } from "react";

const FakeAuth = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initial = {
  authentication: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, authentication: true, user: action.payload };
    case "logout":
      return { ...state, authentication: false, user: null };

    default:
      throw new Error("Unknown action");
  }
}

function FakeAuthentication({ children }) {
  const [{ authentication, user }, dispatch] = useReducer(reducer, initial);
  function login(password, email) {
    if (FAKE_USER.password === password && FAKE_USER.email === email) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <FakeAuth.Provider value={{ authentication, login, logout, user }}>
      {children}
    </FakeAuth.Provider>
  );
}
function useAuth() {
  const use = useContext(FakeAuth);
  if (use === undefined) throw new Error("Sorrt");
  return use;
}

export { useAuth, FakeAuthentication };
