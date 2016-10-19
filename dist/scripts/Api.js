'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.Api = function () {

    return {
        signUpUser: function signUpUser(data) {
            var email = data.email;
            var password = data.password;

            return firebase.auth().createUserWithEmailAndPassword(email, password);
        },
        storeUserInfo: function storeUserInfo(data) {
            var name = data.name;
            var job_title = data.job_title;
            var phone = data.phone;


            var currentUser = firebase.auth().currentUser;
            if (currentUser) {
                return currentUser.updateProfile({
                    name: name,
                    job_title: job_title,
                    phone: phone
                });
            } else {
                throw 'No current user signed in';
            }
        },
        submitEvent: function submitEvent(data) {
            var _firebase$database$re;

            // const { event_name, event_type, event_host, event_start_time, event_end_time, event_location, event_additional_info } = data;
            var uid = firebase.auth().currentUser.id;
            var newKey = firebase.database().ref().child('events').push().key;
            return firebase.database().ref().update((_firebase$database$re = {}, _defineProperty(_firebase$database$re, '/events/' + newKey, data), _defineProperty(_firebase$database$re, '/user-events/' + uid, data), _firebase$database$re));
        },
        fetchEvents: function fetchEvents() {
            return firebase.database().ref('/events').once('value').then(function (s) {
                return s.val();
            });
        }
    };
}();
//# sourceMappingURL=Api.js.map
