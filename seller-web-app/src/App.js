import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import LoginForm from './components/login_form';
import SignUpForm from './components/signup_form';
import SellerView from './components/seller_view';
function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/signin">
        <LoginForm />
      </Route>
      <Route path="/signup">
        <SignUpForm />
      </Route>
      <Route path="/seller">
        <SellerView/>
      </Route>
      <Route path="/">
        <LoginForm />
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;