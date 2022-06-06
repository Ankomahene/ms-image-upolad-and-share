import axios from "axios";
import { actionType } from "../const/const";

export const uploadImagesAsync = (files, uploadProgress) => {
  const url = process.env.cloudinaryUploadUrl;
  const config = {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    onUploadProgress: uploadProgress,
  };
  const finalResponses = {
    success: [],
    error: [],
  };

  const uploaders = files.map((file, index) => {
    const formData = new FormData();

    formData.append("file", file.imageFile);
    formData.append("upload_preset", "ms-image-share");
    formData.append("api_key", process.env.cloudinaryApiKey);
    formData.append("timestamp", Date.now() / 1000 || 0);
    const _url =
      index === 1
        ? "https://api.cloudinary.com/v1_1/mister-shadrack/image/"
        : process.env.cloudinaryUploadUrl;

    return axios
      .post(url, formData, config)
      .then((res) => {
        const {
          asset_id,
          original_filename,
          height,
          width,
          created_at,
          secure_url,
        } = res.data;
        finalResponses.success.push({
          id: asset_id,
          filename: original_filename,
          width,
          height,
          createdAt: created_at,
          url: secure_url,
        });
      })
      .catch((err) => {
        const { error, statusText, status } = err.response.data;

        finalResponses.error.push({
          filename: file.imageFile.name,
          message: error.message,
          statusText,
          status,
        });
      });
  });

  return axios
    .all(uploaders)
    .then((_) => finalResponses)
    .catch((_) => finalResponses);
};

export const uploadImageAsync = (image, dispatch, notify) => {
  dispatch({
    type: actionType.setIsUploading,
    payload: { isUploading: true, previousId: image.id },
  });
  dispatch({
    type: actionType.setIsFailed,
    payload: { isFailed: false, previousId: image.id },
  });

  const url = process.env.cloudinaryUploadUrl;
  const config = {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    onUploadProgress: (progressEvent) => {
      var per = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      dispatch({
        type: actionType.updateUploadProgress,
        payload: { uploadProgress: per, previousId: image.id },
      });
    },
  };
  const formData = new FormData();

  formData.append("file", image.imageFile);
  formData.append("upload_preset", "ms-image-share");
  formData.append("api_key", process.env.cloudinaryApiKey);
  formData.append("timestamp", Date.now() / 1000 || 0);

  return axios
    .post(url, formData, config)
    .then((res) => {
      const { asset_id, original_filename, created_at, secure_url } = res.data;
      dispatch({
        type: actionType.updateMultipleImageProperties,
        payload: {
          previousId: image.id,
          id: asset_id,
          filename: original_filename,
          isCompleted: true,
          isUploading: false,
          createdAt: created_at,
          url: secure_url,
        },
      });
      return secure_url;
    })
    .catch((error) => {
      const errorMessage = error.response
        ? error.response.data.error.message
        : `Failed to upload ${image.filename}, try again`;
      notify(errorMessage, "error");
      dispatch({
        type: actionType.setIsFailed,
        payload: { isFailed: true, previousId: image.id },
      });
      dispatch({
        type: actionType.setIsUploading,
        payload: { isUploading: false, previousId: image.id },
      });
    });
};
