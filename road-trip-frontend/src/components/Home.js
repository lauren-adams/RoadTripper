import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import { useContext } from 'react';


const Home = () => {
    const userCtx = useContext(UserContext);

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
                        <Link to={"/login"} className="nav-link">
                            Login
                        </Link>
                    </li>
                </div>
            </nav>
            <p>welcome {userCtx.username} at {userCtx.email}</p>
        </div>

    );
};
export default Home;
