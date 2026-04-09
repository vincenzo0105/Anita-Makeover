const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  return `${import.meta.env.VITE_API_BASE_URL}/uploads/${image}`;
};

export default getImageUrl;