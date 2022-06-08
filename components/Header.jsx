import React, { useContext, useState } from "react";
import styles from "../styles/Header.module.scss";
import Popup from "reactjs-popup";
import { getUrlHistory } from "../functions/url-history";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "./Icons";
import { BsLink } from "react-icons/bs";
import Link from "next/link";
import AppContext from "../context/context";

export const Header = ({ historyActive }) => {
  const { dispatch } = useContext(AppContext);
  const [history, setHistory] = useState([]);

  const handleHistoryView = () => {
    const urlHistory = getUrlHistory();
    console.log(urlHistory);
    setHistory([...urlHistory]);
  };

  const handleReload = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className={styles.header}>
      <Link href="/" passHref>
        <div onClick={handleReload} className={styles.title}>
          MS Image Share
        </div>
      </Link>

      {historyActive && (
        <div className={styles.history}>
          <Popup
            trigger={
              <div>
                <button onClick={handleHistoryView}>History</button>
              </div>
            }
            position="bottom right"
            className="history-popup"
          >
            <div>
              <h3>List of recent uploaded url history</h3>
              {history.length === 0 && <p>No recent history found</p>}
              {history.map((url, index) => (
                <div key={index} className="history-item">
                  {index + 1} {url}
                  <CopyToClipboard text={url}>
                    <button className="copy-btn">
                      <Copy />
                    </button>
                  </CopyToClipboard>
                  <Link href={url} passHref>
                    <button className="new-tab-btn">
                      <BsLink />
                    </button>
                  </Link>
                  {index === history.length - 1 ? (
                    <div className="recent">Most Recent</div>
                  ) : undefined}
                </div>
              ))}
            </div>
          </Popup>
        </div>
      )}
    </div>
  );
};
