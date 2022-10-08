import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Maps from "./components/Maps";
import Trip from "./components/Trip";
import Home from "./components/Home";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import TripList from "./components/TripList";

const tripArr = ['trip1', 'trip2', 'trip3'];  // for test use

function App() {

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/maps" component={Maps} />
        <Route path="/view-trips" component={TripList(tripArr)} />    {/*hard coded*/}
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}

export default App;
