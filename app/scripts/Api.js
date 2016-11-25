window.Api = (function() {

    return {
        signUpUser(data) {
            const { email, password } = data;
            return firebase.auth().createUserWithEmailAndPassword(email, password)
        },

        storeUserInfo(data) {
            const { name, job_title, phone } = data;

            let currentUser = firebase.auth().currentUser;
            if (currentUser) {
                return currentUser.updateProfile({
                    name,
                    job_title,
                    phone
                })
            } else {
                throw 'No current user signed in';
            }
        },

        submitEvent(data) {
            // const { event_name, event_type, event_host, event_start_time, event_end_time, event_location, event_additional_info } = data;
            let uid = firebase.auth().currentUser ? firebase.auth().currentUser.id : null;
            let newKey = firebase.database().ref().child('events').push().key;
            return firebase.database().ref().update({
                [`/events/${newKey}`]: data
                // [`/user-events/${uid}`]: data
            })
        },

        fetchEvents() {
            return firebase.database().ref('/events').once('value').then((s) => s.val());
        }

    }

})()
