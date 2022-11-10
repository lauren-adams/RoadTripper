import React, {Component} from "react";
import {Map, Marker, GoogleApiWrapper} from "google-maps-react"

class App extends Component {
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }

    render() {
        const style = {
            width: "1000px",
            height: "800px"
        }

        return (
            <div className="App">
                <Map
                    google={this.props.google}
                    zoom={15}
                    initialCenter={{
                        lat: 31.5501,
                        lng: -97.1135
                    }}
                    style={style}/>
                <Marker/>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDm3fa141BAW4SlncLns36sYTTk4gx2BOw')
})(App);
