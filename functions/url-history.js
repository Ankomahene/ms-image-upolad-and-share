export const addUrlHistory = (url) => {
  const urlHistory = JSON.parse(localStorage.getItem("ms-url-history"));

  if (
    urlHistory != null ||
    !Array.isArray(JSON.parse(localStorage.getItem("ms-url-history")))
  ) {
    localStorage.setItem("ms-url-history", JSON.stringify([url]));
  }

  if (Array.isArray(urlHistory) && urlHistory.length < 5) {
    const updatedHistory = [...urlHistory, url];
    localStorage.setItem("ms-url-history", JSON.stringify(updatedHistory));
  }

  if (Array.isArray(urlHistory) && urlHistory.length === 5) {
    urlHistory.shift();
    const updatedHistory = [...urlHistory, url];
    localStorage.setItem("ms-url-history", JSON.stringify(updatedHistory));
  }
};

export const getUrlHistory = () => {
  const urlHistory = JSON.parse(localStorage.getItem("ms-url-history"));
  return urlHistory != null || Array.isArray(urlHistory) ? urlHistory : [];
};
