import React, { useContext, useEffect } from "react";
import styles from "../styles/LocalUploadedImages.module.scss";
import { SRLWrapper } from "simple-react-lightbox";
import { CloudUpload } from "./Icons";
import AppContext, { URLContext } from "../context/context";
import { actionType, lightboxOptions } from "../const/const";
import LocalImage from "./LocalImage";
import { uploadImageAsync } from "../services/image-upload-service";
import { addNewUrls } from "../services/firebase-service";

const LocalUploadedImages = () => {
  const { state, dispatch, notify } = useContext(AppContext);
  const { setUrl } = useContext(URLContext);

  const handleClearAllImages = () => {
    dispatch({ type: actionType.clearAllLocalImages });
  };

  const handleFilesUpload = () => {
    state.forEach((image) => {
      if (!image.isCompleted) {
        uploadImageAsync(image, dispatch, notify);
      }
    });
  };

  useEffect(() => {
    if (state.length !== 0 && state.every((image) => image.isCompleted)) {
      const images = state.map((data) => {
        const { filename, id, url } = data;
        return { id, filename, url };
      });
      addNewUrls(images, "15mins")
        .then((doc) =>
          setUrl({
            type: "ADD_NEW_URL",
            payload: `${location.origin}/${doc.id}`,
          })
        )
        .catch(console.log);
    }
  }, [state, setUrl]);

  return (
    <div>
      {state.length > 0 && (
        <SRLWrapper options={lightboxOptions}>
          <div className={styles.container}>
            <div className={styles.localImages}>
              {state.map((imageFile) => (
                <LocalImage key={imageFile.id} image={imageFile} />
              ))}
            </div>
            <div className={styles.actions}>
              {!state.some((image) => image.isCompleted) && (
                <button
                  className={styles.clearBtn}
                  onClick={handleClearAllImages}
                >
                  Clear all
                </button>
              )}
              {!state.every((image) => image.isCompleted) && (
                <button
                  className={styles.uploadBtn}
                  onClick={handleFilesUpload}
                >
                  <CloudUpload /> Upload
                </button>
              )}
            </div>
          </div>
        </SRLWrapper>
      )}
    </div>
  );
};

export default LocalUploadedImages;
