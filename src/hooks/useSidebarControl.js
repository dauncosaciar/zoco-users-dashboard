import { useState, useEffect } from "react";

const useSidebarControl = sidebarRef => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close the sidebar if resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
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
        window.innerWidth < 1024
      ) {
        setIsSidebarOpen(false);
      }
    };

    const handleEscape = e => {
      if (e.key === "Escape" && window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSidebarOpen, sidebarRef]);

  return { isSidebarOpen, setIsSidebarOpen };
};

export default useSidebarControl;
