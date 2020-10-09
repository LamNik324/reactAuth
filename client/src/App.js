import React from "react";
import Login from "./Login";
import Secret from './Secret';
import PrivateRoute from './PrivateRoute'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
      {/* // вынести в другой компонент  */}
      <header>
        <Link to="/login">Войти</Link>
        &nbsp;
        <Link to="/secret">Secret Page</Link>
      </header>
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <PrivateRoute path="/secret" exact>
          <Secret />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
