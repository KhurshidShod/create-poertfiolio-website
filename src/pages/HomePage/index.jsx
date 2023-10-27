import styles from "./HomePage.module.scss";
import video from "../../assets/images/video (2160p).mp4";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <section className={styles.home}>
      <div className="container">
        <div className={styles.home__wrapper}>
          <p>Xurshidbek Shodiyev</p>
          <div className={styles.home__wrapper_maintxt}>
            <video autoPlay loop muted>
              <source src={video} type="video/mp4" />
            </video>
            <h1>
              Create your own CV profile with us and make employers shocked
            </h1>
          </div>
            <button onClick={() => navigate('/login')}>Get Started</button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
