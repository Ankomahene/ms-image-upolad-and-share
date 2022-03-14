import { isFileImage } from "./is-file-image";
import { v4 as uid } from "uuid";

export const scanLoadedFiles = (existingFiles, loadedFiles) => {
  const scanResults = { acceptableFiles: [], errors: [] };

  Object.keys(loadedFiles).forEach(key => {
    if (isFileImage(loadedFiles[key])) {
      if (loadedFiles[key].size > 10000000) {
        scanResults.errors.push(
          `${loadedFiles[key].name}'s size exceeds 10MB.`
        );
      } else if (
        existingFiles.some(
          file => file.imageFile.name === loadedFiles[key].name
        )
      ) {
        scanResults.errors.push(
          `You can't upload images with the same name twice`
        );
      } else {
        const objectUrl = URL.createObjectURL(loadedFiles[key]);
        scanResults.acceptableFiles.push({
          id: uid(),
          filename: loadedFiles[key].name,
          url: objectUrl,
          createdAt: "",
          imageFile: loadedFiles[key],
          isCompleted: false,
          isFailed: false,
          uploadProgress: 0,
          isUploading: false,
        });
      }
    } else {
      scanResults.errors.push(`${loadedFiles[key].name} file is not an image`);
    }
  });

  return scanResults;
};
