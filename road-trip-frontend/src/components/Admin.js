import WebHeader from "./WebHeader";
import {Alert} from "react-bootstrap";
import TrpList from "./TrpList";
import DeleteConfirmation from "./DeleteConfirmation";
import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import Cookies from "universal-cookie";
import UserContext from "./UserContext";
import AdminList from "./AdminList";

function Admin() {
    const cookies = new Cookies();
    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedUsers, setLoadedUsers] = useState([])

    useEffect(() => {
        console.log(cookies.get('jwt').toString());
        setIsLoading(true);
        fetch(
            "https://subjecttochange.dev/api/users", {
                headers: {
                    'Authorization': `Bearer ${cookies.get('jwt')}`
                }
            }).then((response) => {
                return response.json();
        }).then((data) => {
            console.log(data);
            const users = [];

            for (const key in data){
                const user = {
                    id: key,
                    ...data[key]
                }
                users.push(user);
            }

            setIsLoading(false);
            setLoadedUsers(users.reverse());
        });
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }
    if (userCtx.isLoggedIn) {

        return (
            <div>
                <WebHeader />
                <section>
                    <h1>All Users</h1>
                    <AdminList users={loadedUsers}/>
                </section>

                <Link to="/home">Home</Link></div>
        );
    } else {
        return (
            <div>
                <WebHeader />
                <section>
                    <h1>ADMIN ONLY</h1>
                    <p> You should not be able to see this</p>
                </section>
                <Link to="/home">Home</Link></div>
        );
    }


}
export default Admin;