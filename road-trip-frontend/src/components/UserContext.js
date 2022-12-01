import {createContext, useState} from 'react';
//i built out some trip funcitonality to maybe save trip data?? idk or we can just use database
const UserContext = createContext({
    trips: [],
    totalTrips: 0,
    addTrip: (favoriteMeetup) => {
    },
    removeFavorite: (meetupId) => {
    },
    setMyUser: (username, email) => {
    },
    setId: (id) => {
    },
    username: "",
    email: "",
    isLoggedIn: false,
    id: "",
    start: "",
    end: "",
    date: "",
    rating: "",
    tid: "",
    type: "",
    setCurTrip: (start, end, date, rating, tid) => {}

});

export function UserContextProvider(props) {
    const [userTrips, setUserTrips] = useState([]);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userType, setUserType] = useState("");
    const [idd, setIdd] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [curTripS, setCurTripS] = useState("");
    const [curTripE, setCurTripE] = useState("");
    const [curTripD, setCurTripD] = useState("");
    const [curTripR, setCurTripR] = useState("");
    const [curTripI, setCurTripI] = useState("");


    function addTripHandler(favoriteMeetup) {

    }

    function removeTripHandler(meetupId) {
        setUserTrips(prevUserTrips => {
            return prevUserTrips.filter(meetup => meetup.id !== meetupId);
        });
    }

    function setUser(username, email, log, type) {
        setUserName(username);
        setUserEmail(email);
        setLoggedIn(log);
        setUserType(type);
        return 0;
    }


    function setTrip(start1, end1, date1, rating1, tid1) {
        //setCurTrip({... curTrip, start:start1, end: end1, date: date1, rating:rating1, tid:tid1});
        setCurTripS(start1);
        setCurTripE(end1);
        setCurTripD(date1);
        setCurTripR(rating1);
        setCurTripI(tid1);


        return 0;
    }

    function setId(id) {
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
        type: userType,
        id: idd,
        isLoggedIn: loggedIn,
        start: curTripS,
        end: curTripE,
        date: curTripD,
        rating: curTripR,
        tid: curTripI,
        setCurTrip: setTrip
    };

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;