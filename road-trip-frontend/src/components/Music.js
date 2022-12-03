import * as React from 'react';
import { useContext } from 'react';
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import { notify } from "./toast";
import styled from 'styled-components';
import axios from "axios";
import WebHeader from "./WebHeader";
import Cookies from "universal-cookie";
import classes from './TripItem.module.css';




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
  font-size: 14px;
  padding: 10px 30px;
  border-radius: 5px;
  margin: 10px 10px;
  cursor: pointer;
`;


let playlistReturned = false;
let playlistURL;

function Music()  {
    const userCtx = useContext(UserContext);
    const cookies = new Cookies();
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
            //let urlApi =  `https://subjecttochange.dev/api/user/getPlaylist?sad=${isSad}&happy=${isHappy}&energetic=${isEnergetic}&calm=${isCalm}`;
            let urlApi =  `https://subjecttochange.dev/api/user/getPlaylist?val1=${customRange1.data()}&val2=${customRange1.data()}&val3=${customRange1.data()}`;
            const pushData = async () => {
                const responseA = await axios.get(urlApi, {
                    headers: {
                        Authentication: `Bearer ${cookies.get('jwt')}`
                    }
                });
                playlistURL = responseA.data.playlist;
                document.querySelector('#spotifyembed').src = playlistURL;
                document.querySelector('#spotifyembed').height = "800";
            };
            pushData();
            //window.location.reload();

        }
    }
    if (!playlistReturned) {
        return (
            <div>
                <WebHeader />
                <section>
                    <div>
                        <center>
                        <h2><b>What kind of music do you want?</b></h2>
                            <br/><br/>
                        <h3>Are you <i>sad</i> or <i>happy</i>?</h3>
                        <div>
                            <Button type="button" onClick={setSad}>I'm Sad</Button>
                            <Button type="button" onClick={setHappy}>I'm Happy</Button>
                            <label htmlFor="customRange1" className="form-label">Example range</label>
                            <input width="200px" type="range" className="form-range"  min="0" max="100" id="customRange1"></input>

                        </div>
                            <br/><br/>
                        <h3>Are you <i>energetic</i> or <i>calm?</i></h3>
                        <div width="200">
                            <Button type="button" onClick={setEnergetic}>ENERGY</Button>
                            <Button type="button" onClick={setCalm}>zzz</Button>
                            <label htmlFor="customRange2" className="form-label">Example range</label>
                            <input width="200px" type="range" className="form-range"  min="0" max="100" id="customRange2"></input>
                            </div>
                        <div>
                            <h3>Do you want <i>country</i> or <i>pop?</i></h3>
                            <div width="200">
                                <label htmlFor="customRange3" className="form-label">Example range</label>
                                <input width="200px" type="range" className="form-range"  min="0" max="100" id="customRange3"></input>
                            </div>
                            <div>
                            <Link to="/home">
                                <Button type="button">
                                    Back
                                </Button>
                            </Link>
                            <Button type="button" onClick={submit}>
                                Submit
                            </Button>
                        </div>
                        <div>
                            <iframe
                                src="" id="spotifyembed"
                                    width="100%" height="0" frameBorder="0" allowFullScreen=""
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy">
                            </iframe>
                        </div>
                            </center>
                    </div>
                </section>
                </div>
        );}


}


export default Music;
