import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Maps from "./components/Maps";
import Trip from "./components/Trip";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";

function App() {

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
          <Route path="/maps" component={Maps} />
          <Route path="/view-trips" component={Trip} />
          <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}

export default App;
