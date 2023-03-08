import * as React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.sass';

import {
  UilAngleDoubleLeft,
  UilAngleDoubleRight,
  UilInvoice,
} from '@iconscout/react-unicons';

import useUI from '../../helpers/hooks/useUI';
import { sidebarItems } from './sidebarItems';

type Anchor = 'left';

export function Sidebar() {
  const { sidebarWidth, setSidebarWidth } = useUI();
  const anchor: Anchor = 'left';
  //make good animation
  const toggleDrawer = () => {
    if (sidebarWidth == 84) {
      setSidebarWidth(240);
    } else {
      setSidebarWidth(84);
    }
  };

  return (
    <div
      className="sidebar-wrapper"
      style={{ minWidth: sidebarWidth + 'px', maxWidth: sidebarWidth + 'px' }}
    >
      <button onClick={toggleDrawer} className="btn expand-sidebar-button">
        {sidebarWidth > 90 ? (
          <UilAngleDoubleLeft width="4rem" height="2rem" />
        ) : (
          <UilAngleDoubleRight width="4rem" height="2rem" />
        )}
      </button>
      <div className="row sidebar-title-container">
        <div className="col-4">
          <UilInvoice width="3rem" height="3rem" />
        </div>
        <div className="col-8">
          {sidebarWidth > 90 ? (
            <>
              <p className="font-weight-bolder">Money Data</p>
              <p className="small-text">Product of HaLePo</p>
            </>
          ) : (
            ''
          )}
        </div>
      </div>

      <hr />
      <nav className="sidebar-links-container flex-column">
        {sidebarItems.map((item) => {
          return (
            <Link className="btn btn-outline-secondary nav-link" to={item.name}>
              <div className="icon">{item.icon}</div>
              {sidebarWidth > 90
                ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
                : '-'}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
