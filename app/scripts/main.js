let contt = document.getElementById('events');

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (Forms.signUpForm.validateData() === true) {
        console.log('passed');
        Forms.signUpForm.register();
    }
})

window.addEventListener('DOMContentLoaded', function(){

Api.fetchEvents().then((snapshot) => {
    console.log(snapshot);
    for (let eventId in snapshot) {
        let e = snapshot[eventId];
        contt.innerHTML += (`
    		<div class="demo-card-wide mdl-card mdl-shadow--2dp">
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">${e.event_name}</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    <p>Host : ${e.event_host}</p>
                    <p>Event Type : ${e.event_type}</p>
                    <p>Start Time: ${(new Date(e.event_start_time)).toLocaleString()}</p>
                    <p>End Time: ${(new Date(e.event_end_time)).toLocaleString()}</p>
                    <p>Location : ${e.event_location}</p>
                </div>
            </div>
    		`)
    }
});
})

document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (Forms.eventForm.validateData() === true) {
        console.log('passed');
        Forms.eventForm.submitEvent();
    }
    return false;
})

let locEl = document.getElementById('event_location');
var autocomplete;

function initMap() {
console.log('here');
    autocomplete = new google.maps.places.Autocomplete(locEl);
    google.maps.event.addDomListener(locEl, 'keydown', function(e) {
        if (e.keyCode == 13 && $('.pac-container:visible').length) {
            e.preventDefault();
        }
    });
    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        console.log(place.formatted_address);
    })
}

document.getElementById('event-geo-location').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
})
