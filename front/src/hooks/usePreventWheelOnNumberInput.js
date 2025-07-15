// hooks/usePreventWheelOnNumberInput.js
import { useEffect } from "react";

const usePreventWheelOnNumberInput = () => {
  useEffect(() => {
    const handleWheel = (e) => {
      const activeEl = document.activeElement;

      if (
        activeEl &&
        activeEl.tagName === "INPUT" &&
        activeEl.type === "number" &&
        activeEl === e.target
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
};

export default usePreventWheelOnNumberInput;
