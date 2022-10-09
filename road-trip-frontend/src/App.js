import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Maps from "./components/Maps";
import Trip from "./components/Trip";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import TripList from "./components/TripList";
import TripItem from "./components/TripItem";
import Trp from "./components/Trp";
import EditTrip from "./components/EditTrip";

function App() {

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
          <Route path="/maps" component={Maps} />
          <Route path="/view-trips" component={Trp} />
          <Route path="/home" component={Home} />
        <Route path="/test" component={TripItem} />
        <Route path="/profile" component={Profile} />
        <Route path="/trp" component={Trp} />
        <Route path="/edit-trip" component={EditTrip} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}

export default App;
