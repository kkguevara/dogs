import { useHistory } from "react-router-dom";
import style from "../../Styles/styles.module.css";

const Landing = () => {
  const history = useHistory();
  const home = () => {
    history.push("/home");
  };

  return (
    <div className={style.landing_cont}>
      <div className={style.background_img}></div>
      <h1 className={style.title}>DOGS</h1>
      <button className={style.enter_button} onClick={home}>
        Ingresar
      </button>
      <br />
    </div>
  );
};
export default Landing;
