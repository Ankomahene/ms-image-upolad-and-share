import { actionType } from "../const/const";

export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case actionType.addLocalImages:
      return [ ...state, ...payload.newLoadedImages ];
    case actionType.removeSingleLocalImage:
      return [ ...state.filter(file => file.id !== payload.imageId) ];
    case actionType.clearAllLocalImages:
      return [];
    case actionType.updateMultipleImageProperties:
      return state.map(imageItem => {
        if (imageItem.id === payload.previousId) {
          return {
            ...imageItem,
            id: payload.id,
            isCompleted: payload.isCompleted,
            filename: payload.filename,
            url: payload.url,
            isUploading: payload.isUploading,
            imageFile: "",
            createdAt: payload.createdAt,
          };
        }
        return imageItem;
      });

    case actionType.setIsFailed:
      const index = state.findIndex(
        imageItem => imageItem.id === payload.previousId
      );
      state[index] = { ...state[index], isFailed: payload.isFailed };
      return [ ...state ];
    case actionType.setIsUploading:
      const uploadingIndex = state.findIndex(
        imageItem => imageItem.id === payload.previousId
      );
      state[uploadingIndex] = {
        ...state[uploadingIndex],
        isUploading: payload.isUploading,
      };
      return [ ...state ];
    case actionType.updateUploadProgress:
      const progressIndex = state.findIndex(
        imageItem => imageItem.id === payload.previousId
      );
      state[progressIndex] = {
        ...state[progressIndex],
        uploadProgress: payload.uploadProgress,
      };
      return [ ...state ];
    default:
      return state;
  }
};
