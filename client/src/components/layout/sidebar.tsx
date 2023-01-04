import * as React from "react";
import { Link } from "react-router-dom";
import "./sidebar.sass";

type Anchor = "left";

export function Sidebar({ width }: { width: string }) {
  const [state, setState] = React.useState({ left: false });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const anchor: Anchor = "left";

  return (
    <div className="sidebar-wrapper" style={{ minWidth: width }}>
      <div className="row sidebar-title-container">
        <div className="col-4">
          <i className="bi bi-box2-fill nav-icon"></i>
        </div>
        <div className="col-8">
          <p className="font-weight-bolder">MONEY MANAGER</p>
        </div>
      </div>
      <p className="small-text">Product of HaLePo</p>
      <hr />
      <nav className="sidebar-links-container flex-column">
        <Link className="btn btn-outline-secondary nav-link" to="/home">
          Home
        </Link>
        <Link className="btn btn-outline-secondary nav-link" to="/transactions">
          Transactions
        </Link>
        <Link className="btn btn-outline-secondary nav-link" to="/accounts">
          Accounts
        </Link>
        <Link className="btn btn-outline-secondary nav-link" to="/budget">
          Budget
        </Link>
        <Link className="btn btn-outline-secondary nav-link" to="/statistics">
          Statistics
        </Link>
        <Link className="btn btn-outline-secondary nav-link" to="/settings">
          Settings
        </Link>
      </nav>
    </div>
  );
}
