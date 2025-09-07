import { NavLink } from "react-router";
import "./nav.css";
import { useAccount } from "../context/AccountContext";
import { useTheme } from "../context/ThemeContext";
import RequireAuth from "../components/RequireAuth";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaInbox } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

export default function Navbar() {
  const { account } = useAccount();
  const { toggleSidebar } = useTheme();

  return (
    <div className="navBar">
      <header className="navBarHeader">
        <NavLink to={"/"} className={"navTitle"}>
          <h3>Auth System</h3>
        </NavLink>
      </header>
      <nav className="navLinks">
        {!account ? (
          <>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/signup"}>Signup</NavLink>
            <NavLink to={"/forums"}>Forums</NavLink>
          </>
        ) : (
          <>
            <NavLink to={"/forums"}>Forums</NavLink>
            <RequireAuth permission={"admin:panel"}>
              <NavLink to={"/admin"}>Admin</NavLink>
            </RequireAuth>
          </>
        )}
      </nav>
      <div className="buttons">
        <button id="burgerBtn" className={"navBtn"} onClick={toggleSidebar}>
          <GiHamburgerMenu />
        </button>
        <NavLink className={"navBtn"} to={"/inbox"}>
          <FaInbox />
        </NavLink>
        <ThemeButton />
        {account && (
          <>
            <NavLink to={"/account"} className={"navBtn"}>
              <img src={account.avatar_url} alt="Account Avatar" />
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} id={"themeBtn"} className={"navBtn"}>
      {theme === "light" ? <IoMdMoon /> : <MdOutlineWbSunny />}
    </button>
  );
}
