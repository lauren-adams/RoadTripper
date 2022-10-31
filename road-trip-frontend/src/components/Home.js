import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext } from 'react';
import RenderMap from "./RenderMap";
import TripIntegrated from "./TripIntegrated";



const Home = () => {
    const userCtx = useContext(UserContext);

    const logOut = () => {
        userCtx.setMyUser("", "", false);
    };

    return (
        <div>
            <nav class="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/home"} className="navbar-brand">
                    SubjectToChange
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/maps"} className="nav-link">
                            Make A Trip
                        </Link>
                    </li>
                </div>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/view-trips"} className="nav-link">
                            Trips
                        </Link>
                    </li>
                </div>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/music"} className="nav-link">
                            Music
                        </Link>
                    </li>
                </div>


                {userCtx.isLoggedIn ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {userCtx.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/home" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>
                    </div>
                )}

            </nav>
            <p>proof {userCtx.username} at {userCtx.email} id of {userCtx.id}</p>
            <p>test</p>
            <TripIntegrated />

        </div>



    );
};
export default Home;
