import React, { useContext } from "react";
import styles from "../styles/ShareImageCard.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "./Icons";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import Popup from "reactjs-popup";
import { FaShare } from "react-icons/fa";
import { URLContext } from "../context/context";

const postTitle = "MS IMAGE SHARE";
const postText = `Download images from here`;

const mediaLinks = {
  whatsApp: `https://api.whatsapp.com/send?`,
  facebook: `https://www.facebook.com/sharer.php?`,
};

const ShareImageCard = () => {
  const { url } = useContext(URLContext);

  const whatsAppUrl = `${mediaLinks.whatsApp}text=*${postTitle}* ${postText} ${url}`;
  const facebookUrl = `${mediaLinks.facebook}u=${url}`;

  return (
    <Popup
      trigger={
        <button className={styles.triggerBtn}>
          <FaShare />
        </button>
      }
      position="right center"
      modal={true}
      className="share-popup"
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
          <a
            href={whatsAppUrl}
            className={`${styles.iconBtn} ${styles.whatsapp}`}
          >
            <FaWhatsapp />
          </a>
          <a
            href={facebookUrl}
            className={`${styles.iconBtn} ${styles.facebook}`}
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </Popup>
  );
};

export default ShareImageCard;
