const debounce = (
  func: (...args: never[]) => void,
  delay: number
): (() => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: never[]) => {
    const callback = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};

export default debounce;
