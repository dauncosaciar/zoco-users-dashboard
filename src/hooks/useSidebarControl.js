import { useState, useEffect } from "react";
import { DESKTOP } from "@/utils/constants";

const useSidebarControl = (sidebarRef, toggleRef) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log("isSidebarOpen:", isSidebarOpen);

  // Close the sidebar if resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close the sidebar when clicking outside or pressing Escape (ESC)
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleClickOutside = e => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        (!toggleRef?.current || !toggleRef.current.contains(e.target)) &&
        window.innerWidth < DESKTOP
      ) {
        setIsSidebarOpen(false);
      }
    };

    const handleEscape = e => {
      if (e.key === "Escape" && window.innerWidth < DESKTOP) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSidebarOpen, sidebarRef, toggleRef]);

  return { isSidebarOpen, setIsSidebarOpen };
};

export default useSidebarControl;
