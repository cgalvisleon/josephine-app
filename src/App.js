import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";

/** Layouts */
import Layout from "./layouts/layout";

/** Pages */
import Home from "./pages/home";
import NotFound from "./pages/notfound";
import Help from "./pages/help";

/** Projects */

/** Views */

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/help" component={Help} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
