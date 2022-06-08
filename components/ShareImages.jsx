import React, { useEffect, useState } from "react";
import { getImages } from "../services/firebase-service";
import styles from "../styles/SharePage.module.scss";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";

export const ShareImages = ({ id }) => {
  const [images, setImages] = useState([]);
  const [expired, setExpired] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function getMyImages() {
      const res = await getImages(id);

      setIsLoading(false);
      if (res.exist) {
        setImages(res.data.images);

        const now = new Date(Date.now());
        const dateNow = Timestamp.fromDate(now).toMillis();
        Timestamp.fromDate(now).toDate().getHours;
        const expiryDate = res.data.expiresAt.toMillis();
        setExpired(dateNow > expiryDate);
        setExpiryDate(
          `${res.data.expiresAt.toDate().toDateString()} ${res.data.expiresAt
            .toDate()
            .getHours()}:${res.data.expiresAt
            .toDate()
            .getMinutes()}:${res.data.expiresAt.toDate().getSeconds()}`
        );
      } else {
        setNotFound(true);
      }
    }

    getMyImages();
  }, [id]);

  return (
    <div style={{ textAlign: "center" }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : notFound ? (
        <>
          <h1> Sorry! The Image(s) you are looking for could not be found</h1>
          <Link href="/" passHref>
            <button className={styles.uploadNewBtn}>
              Upload and Share new Images
            </button>
          </Link>
        </>
      ) : (
        <>
          {expired ? (
            <>
              <h1 style={{ textAlign: "center" }}>
                Image{images.length > 1 ? "s" : ""} no longer exist
              </h1>
              <p>Expired on: {expiryDate}</p>
              <Link href="/" passHref>
                <button className={styles.uploadNewBtn}>
                  Upload and Share new Images
                </button>
              </Link>
            </>
          ) : (
            <>
              <h1>Download Image{images.length > 1 ? "s" : ""}</h1>
              <p>Expires on: {expiryDate}</p>
              <div className={styles.row}>
                {images.map((image) => (
                  <Column key={image.id} image={image} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export const Column = ({ image }) => {
  const downloadImage = () => {
    saveAs(image.url, image.filename);
  };

  return (
    <div className={styles.column}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.url} alt={image.filename} />
      <div className={styles.overlay}>
        <button
          onClick={downloadImage}
          className={styles.downloadBtn}
          download={image.filename}
        >
          <FaDownload />
        </button>
      </div>
    </div>
  );
};
