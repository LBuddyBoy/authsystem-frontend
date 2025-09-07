import { useContext, createContext, useState, useEffect, useRef } from "react";
import { capitalizeFirstLetter } from "../util/utils";
import { useLocation } from "react-router";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [sidebar, setSidebar] = useState(false);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    const routes =
      pathname === "/" ? ["Home"] : pathname.split("/").splice(1, 2);

    document.title =
      "Auth System • " + routes.map(capitalizeFirstLetter).join(" ");
  });
  
  useEffect(() => {
    // Make sure we are always showing the sidebar to other than mobile
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebar(false);
        return;
      }

      setSidebar(true);
    };

    const handleClickOutside = (event) => {
      // Don't worry about people that aren't mobile
      if (!sidebar || window.innerWidth > 768) return;
      if (sidebarRef.current && sidebarRef.current.contains(event.target)) {
        return;
      }

      setSidebar(false);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "dark");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  const exports = {
    sidebar,
    theme,
    toggleTheme,
    toggleSidebar,
    sidebarRef,
  };

  return (
    <ThemeContext.Provider value={exports}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) throw Error("useTheme must be used from inside ThemeProvider");

  return context;
}
