import React, { useState, useEffect } from 'react';

import TrpList from './TrpList';
import { useContext } from 'react';
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import TrpItem from "./TrpItem";
import classes from "./TripItem.module.css";
import { notify } from "./toast";



//The way this works is that the decisions
//are a matrix. The user can choose "happy" or
//"sad", and "calm" or "energetic". There are 4
//total combinations, shown below as unique Spotify
//playlists.

const HappyCalm = "https://open.spotify.com/playlist/57UzxeOSaSbw4UyySlTWHp?si=0c9df277baba4bf8";
const HappyEnergetic = "https://open.spotify.com/playlist/3ZK3Xs4ZFPCeekT6dXsDmm?si=dbde3180caad4474";
const SadCalm = "https://open.spotify.com/playlist/4MYukieWIJWuLM3buEFk0B?si=a0950e54fa44475d";
const SadEnergetic = "https://open.spotify.com/playlist/09MB9D7A0DX20Rp3zX1mq9?si=bd7ea5131c7f47d0";

function Music() {
    const userCtx = useContext(UserContext);
    const [loadedTrips, setLoadedTrips] = useState([]);
    let isSad = 0;
    let isHappy = 0;
    let isCalm = 0;
    let isEnergetic = 0;

    function setSad() {
        isHappy = false;
        isSad = true;
    }
    function setHappy() {
        isHappy = true;
        isSad = false;
    }
    function setCalm() {
        isCalm = true;
        isEnergetic = false;
    }
    function setEnergetic() {
        isCalm = false;
        isEnergetic = true;
    }
    function submit() {
        if ((!isSad && !isHappy) || (!isCalm && !isEnergetic)) {
            notify("You must select one from both categories!");
        }
        else {

        }
    }

    return (
        <div>
            <section>
                <h1>Music</h1>
                <div>
                    <h2>What kind of music do you want?</h2>
                    <h3>Are you sad or happy?</h3>
                    <div>
                        <button moodSad={setSad()}>I'm Sad :(</button>
                        <button moodHappy={setHappy()}>I'm Happy :)</button>
                    </div>
                    <h3>Are you energetic or calm?</h3>
                    <div>
                        <button moodEnergetic={setEnergetic()}>ENERGY</button>
                        <button moodCalm={setCalm()}>zzz    </button>
                    </div>
                    <div>

                    </div>
                </div>
            </section>
            <Link to="/home">Back</Link></div>
    );


}


export default Music;