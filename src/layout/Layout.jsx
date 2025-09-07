import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <main>
      <Sidebar />
      <Navbar />
      <Outlet />
    </main>
  );
}
