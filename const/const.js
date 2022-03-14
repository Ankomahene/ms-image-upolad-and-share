export const actionType = {
  addLocalImages: "ADD_LOCAL_IMAGES",
  removeSingleLocalImage: "REMOVE_LOCAL_IMAGE",
  clearAllLocalImages: "CLEAR_ALL_LOCAL_IMAGES",
  updateMultipleImageProperties: "UPDATE_MULTIPLE_IMAGE_PROPERTIES",
  updateUploadProgress: "UPDATE_UPLOAD_PROGRESS",
  setIsFailed: "SET_IS_FAILED",
  setIsUploading: "SET_IS_UPLOADING",
};

export const lightboxOptions = {
  settings: {
    downloadedFileName: "MS Local Image",
  },
  buttons: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    iconColor: "rgba(116, 142, 236, 0.8)",
    iconPadding: "10px",
    showAutoplayButton: false,
    showDownloadButton: false,
    showFullscreenButton: false,
    showThumbnailsButton: false,
  },
};

export const toastOptions = {
  position: "bottom-right",
  autoClose: 10000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  // theme: "colored",
};
