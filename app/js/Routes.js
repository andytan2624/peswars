'use strict';

import React                       from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App                         from './App';
import HomePage                    from './pages/HomePage';
import StaffPage                   from './pages/StaffPage';
import CategoriesPage              from './pages/CategoriesPage';
import CategoryPage                from './pages/CategoryPage';
import SearchPage                  from './pages/SearchPage';
import NotFoundPage                from './pages/NotFoundPage';
import DeskPlanPage                from './pages/DeskPlanPage';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>

      <IndexRoute component={HomePage} />

      <Route path="/" component={HomePage} >
          <Route path="desk-plan" component={DeskPlanPage} />
          <Route path="desk-plan/:deskId" component={DeskPlanPage} />
      </Route>
      <Route path="categories" component={CategoriesPage} />
      <Route path="categories/:category" component={CategoryPage} />

      <Route path="/search" component={SearchPage} pageTitle="Search Page" />
      <Route path="/staff" component={StaffPage} pageTitle="Staff Page" />

      <Route path="*" component={NotFoundPage} />

    </Route>
  </Router>
);