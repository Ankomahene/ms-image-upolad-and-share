export const getExpiryDate = (value) => {
  const now = Date.now();

  switch (value) {
    case "5mins":
      return new Date(now + 1000 * 60 * 5);
    case "15mins":
      return new Date(now + 1000 * 60 * 15);
    case "30mins":
      return new Date(now + 1000 * 60 * 30);
    case "60mins":
      return new Date(now + 1000 * 60 * 60);
    // ---------------------------------------------
    case "2hours":
      return new Date(now + 1000 * 60 * 60 * 2);
    case "3hours":
      return new Date(now + 1000 * 60 * 60 * 3);
    case "4hours":
      return new Date(now + 1000 * 60 * 60 * 4);
    case "5hours":
      return new Date(now + 1000 * 60 * 60 * 5);
    // ---------------------------------------------
    case "1day":
      return new Date(now + 1000 * 60 * 60 * 24);
    case "2days":
      return new Date(now + 1000 * 60 * 60 * 24 * 2);
    case "3days":
      return new Date(now + 1000 * 60 * 60 * 24 * 3);
    case "4days":
      return new Date(now + 1000 * 60 * 60 * 24 * 4);
    case "5days":
      return new Date(now + 1000 * 60 * 60 * 24 * 5);
    case "6days":
      return new Date(now + 1000 * 60 * 60 * 24 * 6);
    // ---------------------------------------------
    case "1week":
      return new Date(now + 1000 * 60 * 60 * 24 * 7);
    case "2weeks":
      return new Date(now + 1000 * 60 * 60 * 24 * 14);
    case "3weeks":
      return new Date(now + 1000 * 60 * 60 * 24 * 21);
    case "1month":
      return new Date(now + 1000 * 60 * 60 * 24 * 30);
    // ---------------------------------------------
    default:
      return new Date(now + 1000 * 60 * 5); // 5mins
  }
};
