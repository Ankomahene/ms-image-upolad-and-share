import React, { useContext, useState } from "react";
import styles from "../styles/LocalUploadedImages.module.scss";
import { SRLWrapper } from "simple-react-lightbox";
import { CloudUpload } from "./Icons";
import AppContext from "../context/context";
import { actionType, lightboxOptions } from "../const/const";
import LocalImage from "./LocalImage";
import { uploadImageAsync } from "../services/image-upload-service";

const LocalUploadedImages = () => {
  const { state, dispatch, notify } = useContext(AppContext);

  const handleClearAllImages = () => {
    dispatch({ type: actionType.clearAllLocalImages });
  };

  const handleFilesUpload = () => {
    state.forEach(image => {
      if (!image.isCompleted) {
        uploadImageAsync(image, dispatch, notify);
      }
    });
  };

  return (
    <div>
      {state.length > 0 && (
        <SRLWrapper options={lightboxOptions}>
          <div className={styles.container}>
            <div className={styles.localImages}>
              {state.map(imageFile => (
                <LocalImage key={imageFile.id} image={imageFile} />
              ))}
            </div>
            <div className={styles.actions}>
              {!state.some(image => image.isCompleted) && (
                <button
                  className={styles.clearBtn}
                  onClick={handleClearAllImages}
                >
                  Clear all
                </button>
              )}
              {!state.every(image => image.isCompleted) && (
                <button
                  className={styles.uploadBtn}
                  onClick={handleFilesUpload}
                >
                  <CloudUpload /> Upload All
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
