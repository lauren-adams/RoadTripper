import * as React from 'react';
import { useContext } from 'react';
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import { notify } from "./toast";
import styled from 'styled-components';
import axios from "axios";



//The way this works is that the decisions
//are a matrix. The user can choose "happy" or
//"sad", and "calm" or "energetic". There are 4
//total combinations, shown below as unique Spotify
//playlists.

const HappyCalm = "https://open.spotify.com/playlist/57UzxeOSaSbw4UyySlTWHp?si=0c9df277baba4bf8";
const HappyEnergetic = "https://open.spotify.com/playlist/3ZK3Xs4ZFPCeekT6dXsDmm?si=dbde3180caad4474";
const SadCalm = "https://open.spotify.com/playlist/4MYukieWIJWuLM3buEFk0B?si=a0950e54fa44475d";
const SadEnergetic = "https://open.spotify.com/playlist/09MB9D7A0DX20Rp3zX1mq9?si=bd7ea5131c7f47d0";

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

let playlistReturned = false;
let playlistURL;

function Music()  {
    const userCtx = useContext(UserContext);
    let isSad = false;
    let isHappy = false;
    let isCalm = false;
    let isEnergetic = false;


    const setSad = () => {
        isHappy = false;
        isSad = true;
    }
    const setHappy = () => {
        isHappy = true;
        isSad = false;
    }
    const setCalm = () => {
        isCalm = true;
        isEnergetic = false;
    }
    const setEnergetic = () => {
        isCalm = false;
        isEnergetic = true;
    }
    const submit = () => {
        if ((!isSad && !isHappy) || (!isCalm && !isEnergetic)) {
            notify("You must select one from both categories!");
        }
        else {
            let urlApi =  `https://subjecttochange.dev/api/user/getPlaylist?sad=${isSad}&happy=${isHappy}&energetic=${isEnergetic}&calm=${isCalm}`;
            const pushData = async () => {
                const responseA = await axios.get(urlApi);
                playlistURL = responseA.data.playlist;
                document.querySelector('#spotifyembed').src = playlistURL;
                document.querySelector('#spotifyembed').height = 380;
            };
            pushData();
            //window.location.reload();

        }
    }
    if (!playlistReturned) {
        return (
            <div>
                <section>
                    <h1>Music</h1>
                    <div>
                        <h2>What kind of music do you want?</h2>
                        <h3>Are you sad or happy?</h3>
                        <div>
                            <button type="button" onClick={setSad}>I'm Sad :(</button>
                            <button type="button" onClick={setHappy}>I'm Happy :)</button>
                        </div>
                        <h3>Are you energetic or calm?</h3>
                        <div>
                            <button type="button" onClick={setEnergetic}>ENERGY</button>
                            <button type="button" onClick={setCalm}>zzz    </button>
                        </div>
                        <div>
                            <button type="button" onClick={submit}>Submit</button>
                        </div>
                        <div>
                            <iframe
                                src="" id="spotifyembed"
                                    width="100%" height="0" frameBorder="0" allowFullScreen=""
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy">
                            </iframe>
                        </div>
                    </div>
                </section>
                <Link to="/home">Back</Link></div>
        );}


}


export default Music;
