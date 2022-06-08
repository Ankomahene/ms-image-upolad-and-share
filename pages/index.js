import { useContext } from "react";
import styles from "../styles/Home.module.scss";
import Dropzone from "../components/Dropzone";
import LocalUploadedImages from "../components/LocalUploadedImages";
import SimpleReactLightbox from "simple-react-lightbox";
import ShareImageCard from "../components/ShareImageCard";
import AppContext from "../context/context";
import { Header } from "../components/Header";
import { BsUpload } from "react-icons/bs";

const Home = () => {
  const { state } = useContext(AppContext);

  const handlePageReload = () => {
    location.reload();
  };

  return (
    <div>
      <Header historyActive={true} />
      <main>
        <h1 className={styles.title}>Upload and share your images</h1>
        <h3 className={styles.subTitle}>Maximum Image size allowed is 10MB</h3>
        {state.length === 0 && <Dropzone />}
        {state.length !== 0 &&
          !state.every((image) => image.isCompleted === true) && <Dropzone />}
        {state.length > 0 && state.every((image) => image.isCompleted) && (
          <div className={styles.uploadCompleted}>
            <div className={styles.readyToShare}>
              <div>
                <span className={styles.label}>
                  Your images are ready to be shared
                </span>
              </div>
              <ShareImageCard />
            </div>

            <button onClick={handlePageReload} className={styles.newUploadBtn}>
              <BsUpload fontSize="1rem" /> Upload new
            </button>
          </div>
        )}
        <SimpleReactLightbox>
          <LocalUploadedImages />
        </SimpleReactLightbox>
      </main>
    </div>
  );
};

export default Home;
