import { createContext, useState } from 'react';
//i built out some trip funcitonality to maybe save trip data?? idk or we can just use database
const UserContext = createContext({
    trips: [],
    totalTrips: 0,
    addTrip: (favoriteMeetup) => {},
    removeFavorite: (meetupId) => {},
    setMyUser: (username,email) => {},
    username: "",
    email: "",
    isLoggedIn: false,

});

export function UserContextProvider(props) {
    const [userTrips, setUserTrips] = useState([]);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    function addTripHandler(favoriteMeetup) {

    }

    function removeTripHandler(meetupId) {
        setUserTrips(prevUserTrips => {
            return prevUserTrips.filter(meetup => meetup.id !== meetupId);
        });
    }

    function setUser(username, email, log){
            setUserName(username);
            setUserEmail(email);
            setLoggedIn(log);
            return 0;
    }

    function isLoggedIn() {
        return loggedIn;
    }


    const context = {
        trips: userTrips,
        totalTrips: userTrips.length,
        addTrip: addTripHandler,
        removeTrip: removeTripHandler,
        setMyUser: setUser,
        username: userName,
        email: userEmail,
        isLoggedIn: loggedIn
    };

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;