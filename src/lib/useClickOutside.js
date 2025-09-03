import { useCallback, useEffect } from "react";

const useClickOutside = (ref, callback) => {
  const handleClick = useCallback(
    (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      callback(event);
    },
    [callback, ref],
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);
};

export default useClickOutside;
