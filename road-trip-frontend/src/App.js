import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Maps from "./components/Maps";
import Trip from "./components/Trip";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
          <Route path="/maps" component={Maps} />
          <Route path="/view-trips" component={Trip} />
        <Redirect from="/" to="/signup" />
      </Switch>
    </>
  );
}

export default App;
