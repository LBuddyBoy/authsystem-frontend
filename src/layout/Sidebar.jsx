import { NavLink } from "react-router";
import { useAccount } from "../context/AccountContext";
import { useTheme } from "../context/ThemeContext";
import RequireAuth from "../components/RequireAuth";
import "./sidebar.css";

export default function Sidebar() {
  const { sidebar, sidebarRef } = useTheme();
  const { account } = useAccount();

  if (!sidebar) return;

  return (
    <div className="sidebar" ref={sidebarRef}>
      <header className="sidebarHeader">
        <NavLink to={"/"} className={"sidebarTitle"}>
          <h3>Auth System</h3>
        </NavLink>
      </header>
      <div className="headerDivider">
        <span>{" "}</span>
      </div>
      <nav className="sidebarNavLinks">
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
    </div>
  );
}
