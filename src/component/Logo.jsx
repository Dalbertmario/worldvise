import { Link } from "react-router-dom";
import style from "./Logo.module.css";
function Logo() {
  return (
    <Link to="/">
      <img src="../icon.png" className={style.logo} alt="logo" />
    </Link>
  );
}

export default Logo;
