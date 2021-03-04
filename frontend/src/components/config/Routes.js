import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../home/index";
import Register from "../register/index";
import BeerPage from "../beer/index";
import PageNotFound from "../layouts/404";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/register" render={(props) => <Register {...props} />} />
        <Route exact path="/beer/:id" render={(props) => <BeerPage {...props} />} />
        <Route exact path="/404" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;