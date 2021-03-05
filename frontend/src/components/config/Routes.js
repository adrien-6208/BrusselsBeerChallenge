import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../home/index";
import Register from "../register/index";
import BeerPage from "../beer/index";
import PageNotFound from "../layouts/404";
import Result from "../results/index";
import CategoryPage from "../results/Category";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/register" render={(props) => <Register {...props} />} />
        <Route exact path="/beer/:id" render={(props) => <BeerPage {...props} />} />
        <Route exact path="/result" render={(props) => <Result {...props} />} />
        <Route exact path="/result/:id" render={(props) => <CategoryPage {...props} />} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;