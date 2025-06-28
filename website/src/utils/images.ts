export const getImageUrl = (image: string) =>
  `${process.env.NODE_ENV === "production" ? `https://raw.githubusercontent.com/SahilAggarwal2004/react-text-to-speech/master/website/static` : ""}/assets/images/${image}`;
