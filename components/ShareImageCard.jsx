import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/ShareImageCard.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy, Share } from "./Icons";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import Popup from "reactjs-popup";
import { FaShare } from "react-icons/fa";
import { URLContext } from "../context/context";

const ShareImageCard = () => {
  const { url } = useContext(URLContext);

  return (
    <Popup
      trigger={
        <button className={styles.triggerBtn}>
          <FaShare />
        </button>
      }
      position="right center"
      modal={true}
    >
      <div className={styles.shareCard}>
        <div className={styles.title}>Ready to Share?</div>
        <div className={styles.info}>Copy link to share</div>
        <div className={styles.viewerLinkSection}>
          <div className={styles.label}> Viewer Link </div>
          <div className={styles.main}>
            <input
              defaultValue={url}
              className={styles.viewLinkField}
              readOnly
            />
            <CopyToClipboard text={url}>
              <button>
                <Copy />
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className={styles.info}>or share on</div>
        <div className={styles.socialIcons}>
          <button className={`${styles.iconBtn} ${styles.whatsapp}`}>
            <FaWhatsapp />
          </button>
          <button className={`${styles.iconBtn} ${styles.facebook}`}>
            <FaFacebook />
          </button>
          <button className={`${styles.iconBtn} ${styles.instagram}`}>
            <FaInstagram />
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default ShareImageCard;
