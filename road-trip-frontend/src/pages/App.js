import SignUp from "./SignUp";
import Login from "./Login";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
    return (
        <>
            <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Redirect from="/" to="/signup" />
            </Switch>
            </Router>
        </>
    );
}

export default App;