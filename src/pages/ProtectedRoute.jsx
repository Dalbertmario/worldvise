import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthentication";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { authentication } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!authentication) navigate("/");
    },
    [navigate, authentication]
  );
  return authentication ? children : null;
}

export default ProtectedRoute;
