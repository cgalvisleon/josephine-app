import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";

/** Layouts */
import Layout from "./layouts/layout";

/** Pages */
import Home from "./pages/home";
import NotFound from "./pages/notfound";
import Help from "./pages/help";
import Signin from "./pages/signin";
import Register from "./pages/register";
import Forgot from "./pages/forgot";
import Seek from "./pages/seek";
import Issues from "./pages/issues";
import Politics from "./pages/politics";
import Agreements from "./pages/agreements";
import Terms from "./pages/terms";

/** Projects */

/** Views */

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot" component={Forgot} />
          <Route exact path="/seek" component={Seek} />
          <Route exact path="/issues" component={Issues} />
          <Route exact path="/politics" component={Politics} />
          <Route exact path="/agreements" component={Agreements} />
          <Route exact path="/terms" component={Terms} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
