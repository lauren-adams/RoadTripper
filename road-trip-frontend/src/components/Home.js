import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext } from 'react';
import TripIntegrated from "./TripIntegrated";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Home = () => {
    const userCtx = useContext(UserContext);

    const logOut = () => {
        userCtx.setMyUser("", "", false);
        cookies.remove('jwt', { path: '/' });
    };

    return (
        <div>
            <nav className ="navbar navbar-expand ">
                <Link to={"/home"} className="navbar-brand">
                    SubjectToChange
                </Link>
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
                        <li className="nav-item">
                            <Link to={"/view-trips"} className="nav-link">
                                Trips
                            </Link>
                        </li>
                        {userCtx.type === "o" ? (<div className="navbar-nav ml-auto">
                                <li>
                                    <Link to={"/admin-page"} className="nav-link">
                                        ADMIN
                                    </Link>
                                </li>)
                            </div>)
                            :(<div></div>)}
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
            <TripIntegrated />

        </div>



    );
};
export default Home;
