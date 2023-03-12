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
  const { isSidebarExpanded, sidebarWidth, toggleSidebarExpanded } = useUI();
  const anchor: Anchor = 'left';
  //make good animation
  const toggleDrawer = () => toggleSidebarExpanded();

  return (
    <div
      className="sidebar-wrapper"
      style={{ minWidth: sidebarWidth + 'px', maxWidth: sidebarWidth + 'px' }}
    >
      <div className="sidebar-title-container">
        <button onClick={toggleDrawer} className="btn expand-sidebar-button">
          {isSidebarExpanded ? (
            <UilAngleDoubleLeft width="4rem" height="2rem" />
          ) : (
            <UilAngleDoubleRight width="4rem" height="2rem" />
          )}
        </button>
        <UilInvoice width="3rem" height="3rem" />
        {isSidebarExpanded ? (
          <p className="font-weight-bolder">Money Data</p>
        ) : (
          ''
        )}
      </div>

      <hr />
      <nav className="sidebar-links-container">
        {sidebarItems.map((item) => {
          return (
            <Link className="sidebar-navigation-link" to={item.name}>
              <div className="icon">{item.icon}</div>
              <div className="name">
                {isSidebarExpanded
                  ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
                  : ''}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
