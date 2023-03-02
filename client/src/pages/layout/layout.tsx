import "./layout.sass";
import { Outlet } from "react-router";
import NavBar from "./navbar";
import { Sidebar } from "./sidebar";

// TODO add footer if needed
export default function Layout() {
  const sidebarWidth = 240;
  return (
    <div className="layout-wrapper">
      <Sidebar width={sidebarWidth + "px"} />
      <div className="content-wrapper">
        <NavBar sidebarWidth={sidebarWidth} />
        <div
          className="main-container"
          style={{
            marginLeft: sidebarWidth + sidebarWidth * 0.15 + "px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
