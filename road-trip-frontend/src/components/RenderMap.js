import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"
class App extends Component {
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
                        lat: 31.5500894,
                        lng: -97.1157287
                    }}
                    style={style}/>
                <Marker />
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyDm3fa141BAW4SlncLns36sYTTk4gx2BOw')
})(App);