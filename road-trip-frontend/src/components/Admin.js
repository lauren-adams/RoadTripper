import WebHeader from "./WebHeader";
import {Alert} from "react-bootstrap";
import TrpList from "./TrpList";
import DeleteConfirmation from "./DeleteConfirmation";
import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import Cookies from "universal-cookie";
import UserContext from "./UserContext";
import AdminList from "./AdminList";
import axios from "axios";

function Admin() {
    const cookies = new Cookies();
    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedUsers, setLoadedUsers] = useState([])
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [userMessage, setUserMessage] = useState(null);
    const [userId, setUserId] = useState(null);





    useEffect(() => {

        setIsLoading(true);
        fetch(
            "https://subjecttochange.dev/api/users", {
                headers: {
                    'Authorization': `Bearer ${cookies.get('jwt')}`
                }
            }).then((response) => {
                return response.json();
        }).then((data) => {
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


    const showDeleteModal = (id) => {
        //console.log(loadedTrips);
        setUserId(id);
        setUserMessage(null);
        setDeleteMessage(`Are you sure you want to delete the user '${loadedUsers.find((x) => x.id === id).id}'?`);
        setDisplayConfirmationModal(true);
    };

    // Hide the modal
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    // Handle the actual deletion of the item
    const submitDelete =  async (id) => {
        console.log(id);
        setUserMessage(`The user '${loadedUsers.find((x) => x.id === id).id}' was deleted successfully.`);
        setLoadedUsers(loadedUsers.filter((user) => user.id !== id));
        setDisplayConfirmationModal(false);
        console.log("Delete");
        let delUrl = 'https://subjecttochange.dev/api/user/' + id;
        let delUrl2 = 'http://localhost:8080/user/' + id;
        // const delData = async () => {
        //     //const responseA = axios.post(urlApi);
        //     const responseA = axios({
        //         method: 'delete',
        //         url: delUrl2,
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Access-Control-Allow-Origin': '*',
        //             'Authorization': `Bearer ${cookies.get('jwt')}`
        //         }
        //     });
        // }
        // delData()

        const response = await axios.delete(delUrl, {
            headers: {
                'Authorization': `Bearer ${cookies.get('jwt')}`
            }
        })
    };



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
                    {userMessage && <Alert variant="success">{userMessage}</Alert>}
                    <AdminList users={loadedUsers}
                        show = {showDeleteModal}
                        hide = {hideConfirmationModal}
                        submit = {submitDelete}/>
                </section>
                <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={userId} message={deleteMessage}  />

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