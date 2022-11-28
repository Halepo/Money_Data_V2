import React, { useContext } from 'react';
import { Routes, Route } from 'react-router';
import Layout from '../layout/layout';
import NotFound from '../shared/404';
import Home from './home/home';

export default function Pages() {
  console.log('pages rendered');
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="transactions"
          element={<div>Welcome to Transactions: Coming soon</div>}
        ></Route>
        <Route
          path="accounts"
          element={<div>Welcome to Accounts: Coming soon</div>}
        ></Route>
        <Route
          path="budget"
          element={<div>Welcome to Budget: Coming soon</div>}
        ></Route>
        <Route
          path="statistics"
          element={<div>Welcome to Statistics: Coming soon</div>}
        ></Route>
        <Route
          path="settings"
          element={<div>Welcome to Settings: Coming soon</div>}
        ></Route>
        {/* catch all  */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
