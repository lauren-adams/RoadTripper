import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Maps from "./components/Maps";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";

import Trp from "./components/Trp";
import EditTrip from "./components/EditTrip";
import addStop from "./components/AddStop";
import ViewStops from "./components/ViewStops";
import StopList from "./components/StopList";
import Music from "./components/Music";
import Admin from "./components/Admin"

function App() {


  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
          <Route path="/maps" component={Maps} />
          <Route path="/view-trips" component={Trp} />
          <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/trp" component={Trp} />
        <Route path="/edit-trip" component={EditTrip} />
        <Route path="/add-stop" component={addStop} />
        <Route path="/view-stops" component={ViewStops} />
        <Route path="/view-stoplist" component={StopList} />
        <Route path="/music" component={Music} />
        <Route path="/admin-page" component={Admin} />}
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}

export default App;
