import { useEffect, RefObject } from "react";

const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  callback: (e: unknown) => void
): void => {
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback(e);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, { passive: true });

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;
