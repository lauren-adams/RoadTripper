import React, {Component} from "react";
import {render} from "react-dom";
import styles from "./SignUp.module.css";

const Filter = (data) => {

    //TODO: Don't know how to get google map work with this
    const allFilter = () => {
        // let service = new google.maps.places.PlacesService(map);
        // for (let j = 0; j < waypoints.length; j += 40) {
        //     service.nearbySearch({
        //         location: {lat: data.start, lng: data.end},
        //         radius: '200',
        //         type: ['all']
        //     }, callback);
        //
        //     function callback(results, status) {
        //         if (status == google.maps.places.PlacesServiceStatus.OK) {
        //             for (var i = 0; i < results.length; i++) {
        //                 new google.maps.Marker({
        //                     position: results[i].geometry.location,
        //                     map,
        //                     title: "Hello World!"
        //                 });
        //             }
        //         }
        //     }
        // }
    }

    const restFilter = () => {
        // let service = new google.maps.places.PlacesService(map);
        // for (let j = 0; j < waypoints.length; j += 40) {
        //     service.nearbySearch({
        //         location: {lat: data.start, lng: data.end},
        //         radius: '200',
        //         type: ['restaurant']
        //     }, callback);
        //
        //     function callback(results, status) {
        //         if (status == google.maps.places.PlacesServiceStatus.OK) {
        //             for (var i = 0; i < results.length; i++) {
        //                 new google.maps.Marker({
        //                     position: results[i].geometry.location,
        //                     map,
        //                     title: "Hello World!"
        //                 });
        //             }
        //         }
        //     }
        // }
    }

    const scenFilter = () => {
        // let service = new google.maps.places.PlacesService(map);
        // for (let j = 0; j < waypoints.length; j += 40) {
        //     service.nearbySearch({
        //         location: {lat: data.start, lng: data.end},
        //         radius: '200',
        //         type: ['scenic']
        //     }, callback);
        //
        //     function callback(results, status) {
        //         if (status == google.maps.places.PlacesServiceStatus.OK) {
        //             for (var i = 0; i < results.length; i++) {
        //                 new google.maps.Marker({
        //                     position: results[i].geometry.location,
        //                     map,
        //                     title: "Hello World!"
        //                 });
        //             }
        //         }
        //     }
        // }
    }

    const hotelFilter = () => {
        // let service = new google.maps.places.PlacesService(map);
        // for (let j = 0; j < waypoints.length; j += 40) {
        //     service.nearbySearch({
        //         location: {lat: data.start, lng: data.end},
        //         radius: '200',
        //         type: ['hotel']
        //     }, callback);
        //
        //     function callback(results, status) {
        //         if (status == google.maps.places.PlacesServiceStatus.OK) {
        //             for (var i = 0; i < results.length; i++) {
        //                 new google.maps.Marker({
        //                     position: results[i].geometry.location,
        //                     map,
        //                     title: "Hello World!"
        //                 });
        //             }
        //         }
        //     }
        // }
    }

    const mallFilter = () => {
        // let service = new google.maps.places.PlacesService(map);
        // for (let j = 0; j < waypoints.length; j += 40) {
        //     service.nearbySearch({
        //         location: {lat: data.start, lng: data.end},
        //         radius: '200',
        //         type: ['mall']
        //     }, callback);
        //
        //     function callback(results, status) {
        //         if (status == google.maps.places.PlacesServiceStatus.OK) {
        //             for (var i = 0; i < results.length; i++) {
        //                 new google.maps.Marker({
        //                     position: results[i].geometry.location,
        //                     map,
        //                     title: "Hello World!"
        //                 });
        //             }
        //         }
        //     }
        // }
    }

    return (
        <center>
            <h2>Filter</h2>
            <button className={styles.button} >
                All
            </button>
            <button className={styles.button} onClick={restFilter}>
                Restaurant
            </button>
            <button className={styles.button} onClick={scenFilter}>
                Scenic Spot
            </button>
            <button className={styles.button} onClick={hotelFilter}>
                Hotel
            </button>
            <button className={styles.button} onClick={mallFilter}>
                Shopping
            </button>
        </center>
    )

}

export default Filter;