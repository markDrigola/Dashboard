const symbol = Symbol();

// let mapg;
// let marker;
// let self;
let geocoder = new google.maps.Geocoder;

class Location {
    constructor ($http,NgMap) {
        this[symbol] = {$http};
        // self = this;
        // return this[symbol].$http.get(geocoder.geocode({'location':  event})).then((resp)=>{
        //     console.log(data);
        //     return resp.data;
        // });
        // this.startPosition = ()=> {
        //     return new Promise((resolve, reject)=> {
        //     NgMap.getMap().then(function(map) {
        //         mapg = map;
        //         marker = map.markers[0];
        //         mapg.setCenter(marker.getPosition());
        //
        //         geocoder.geocode({'location':  marker.getPosition()}, function(results, status) {
        //             if (status === google.maps.GeocoderStatus.OK) {
        //                 if (results[0]) {
        //                     mapg.setCenter(marker.getPosition());
        //                     marker.setPosition(marker.getPosition());
        //
        //                         resolve(results[0]);
        //
        //                 } else {
        //                     window.alert('No results found');
        //                 }
        //             } else {
        //                 window.alert('Geocoder failed due to: ' + status);
        //             }
        //         })
        //     });
        //     })
        // };
    }

    getNewLocation(event) {
        return new Promise((resolve, reject)=> {
            geocoder.geocode({'location':  event}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        resolve(results[0]);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            })
        })
    }
}

Location.$inject = ['$http','NgMap'];

export {Location};








// let str = `https://maps.googleapis.com/maps/api/geocode/${'location':  event}`
// // https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters
// return this[symbol].$http.get('/settings').then((resp)=>{
//     return resp.data;
// });