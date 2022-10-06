import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Maps from "./components/Maps";
import Trips from "./components/Trips";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
          <Route path="/maps" component={Maps} />
          <Route path="/view-trips" component={Trips} />
        <Redirect from="/" to="/signup" />
      </Switch>
    </>
  );
}

export default App;
