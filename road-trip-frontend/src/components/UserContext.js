import { createContext, useState } from 'react';
//i built out some trip funcitonality to maybe save trip data?? idk or we can just use database
const UserContext = createContext({
    trips: [],
    totalTrips: 0,
    addTrip: (favoriteMeetup) => {},
    removeFavorite: (meetupId) => {},
    setMyUser: (username,email) => {},
    setId: (id) => {},
    username: "",
    email: "",
    isLoggedIn: false,
    id: ""

});

export function UserContextProvider(props) {
    const [userTrips, setUserTrips] = useState([]);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [idd, setIdd] = useState("");
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
    function setId(id){
        setIdd(id);
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
        setId: setId,
        username: userName,
        email: userEmail,
        id: idd,
        isLoggedIn: loggedIn
    };

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;