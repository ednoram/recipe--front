const processTitle = (string: string): string =>
  string
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export default processTitle;
