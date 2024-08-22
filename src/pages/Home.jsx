import { Link } from "react-router-dom";
import PageNav from "../component/PageNav";
import style from "./Home.module.css";
// import Logo from "../component/Logo";
function Home() {
  return (
    <div>
      <div className={style.homepage}>
        <div className="hed">
          <PageNav />
        </div>
        <section>
          <h1>You Travel The World</h1>
          <h1>WorldWise Keeps Track of Your Advantures</h1>
          <p>
            A world map that your footsteps into every city you can think
            of.Never forget your wonderful experice,and show your friends how to
            have wandered the world
          </p>
          <Link to="/login" className="cta">
            Start Tracking Now
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Home;
