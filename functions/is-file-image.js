export const isFileImage = file => {
  const acceptedImageTypes = [
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
  ];

  return file && acceptedImageTypes.includes(file["type"]);
};
