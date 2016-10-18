window.Forms = (function(window, document) {
    function SignUpForm() {
        this.form = document.getElementById('signupForm');
        this.errors = {}
    }

    SignUpForm.prototype = {
        prepareData() {
            let formData = {
                name: this.form.name.value,
                email: this.form.email.value,
                password: this.form.password.value,
                cpassword: this.form.cpassword.value,
                job_title: this.form.job_title.value,
                phone: this.form.phone.value
            }
            return formData;
        },
        register() {
            var data = this.prepareData();
            let sbHolder = document.getElementById('snackbar-holder');
            Api.signUpUser(data).then(res => {
                Api.storeUserInfo(data).then(r => {
                    sbHolder.MaterialSnackbar.showSnackbar({
                        message: 'Registration Done Successfully',
                        timeout: 3000
                    });
                }).catch(e => {

                })

            }).catch(err => {
                sbHolder.MaterialSnackbar.showSnackbar({
                    message: `Oops! ${err.message}`,
                    timeout: 4000
                });
            });
        },
        validateData() {
            let isDirty = false;
            this.performValidation();
            let self = this;
            console.log(self.errors);
            for (let e in this.errors) {
                if (self.errors[e] != '')
                    isDirty = true;
                let c = document.getElementById(`error-${e}`);
                if (c) {
                    if (self.errors[e])
                        c.style.visibility = 'visible';
                    else
                        c.style.visibility = 'hidden';
                    c.innerText = self.errors[e];
                }
            }
            return !isDirty;
        },
        performValidation() {
            var data = this.prepareData();
            console.log(data);
            for (var prop in data) {
                switch (prop) {
                    case 'name':
                        if (!/[A-Za-z]+/.test(data[prop]))
                            this.errors[prop] = 'Please enter a valid name';
                        else
                            this.errors[prop] = '';
                        break;
                    case 'email':
                        if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(data[prop]))
                            this.errors[prop] = 'Please enter a valid email';
                        else
                            this.errors[prop] = '';
                        break;
                    case 'password':
                        if (!/^(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,}$/.test(data[prop]))
                            this.errors[prop] = 'Please enter a valid password. It should be minimum 8 characters long and have an uppercase and a digit.';
                        else
                            this.errors[prop] = '';
                        break;
                    case 'cpassword':
                        if (data[prop] !== data['password'])
                            this.errors[prop] = `Password don't match`;
                        else
                            this.errors[prop] = '';
                        break;
                    case 'job_title':
                        if (!/\w+/.test(data[prop]))
                            this.errors[prop] = 'Please enter a valid job title';
                        else
                            this.errors[prop] = '';
                        break;
                    case 'phone':
                        if (!/^\+?[\-\d]{10,15}$/.test(data[prop]))
                            this.errors[prop] = 'Please enter a valid phone number';
                        else
                            this.errors[prop] = '';
                        break;
                    default:
                        console.warn(`No such prop exists`);
                }
            }
        }
    }


    function EventForm() {
        this.form = document.getElementById('eventForm');
        this.errors = {}
    }

    EventForm.prototype = {
        prepareData() {
            let formData = {
                event_name: this.form.event_name.value,
                event_type: this.form.event_type.value,
                event_host: this.form.event_host.value,
                event_start_time: this.form.event_start_time.value,
                event_end_time: this.form.event_end_time.value,
                event_location: this.form.event_location.value,
                event_additional_info: this.form.event_additional_info
            }
            return formData;
        },
        submitEvent() {
            var data = this.prepareData();
            let sbHolder = document.getElementById('snackbar-holder');
            Api.submitEvent(data).then(res => {                
                sbHolder.MaterialSnackbar.showSnackbar({
                    message: 'Event Created Successfully',
                    timeout: 3000
                });
            }).catch(err => {
                sbHolder.MaterialSnackbar.showSnackbar({
                    message: `Oops! ${err.message}`,
                    timeout: 4000
                });
            });
        },
        validateData() {
            let isDirty = false;
            this.performValidation();
            let self = this;
            console.log(self.errors);
            for (let e in this.errors) {
                if (self.errors[e] != '')
                    isDirty = true;
                let c = document.getElementById(`error-${e}`);
                if (c) {
                    if (self.errors[e])
                        c.style.visibility = 'visible';
                    else
                        c.style.visibility = 'hidden';
                    c.innerText = self.errors[e];
                }
            }
            return !isDirty;
        },
        performValidation() {
            var data = this.prepareData();
            console.log(data);
            for (var prop in data) {
                switch (prop) {
                    case 'event_name':
                        if (!/[A-Za-z\d\-\.]+/.test(data[prop]))
                            this.errors[prop] = 'Please enter a valid name';
                        else
                            this.errors[prop] = '';
                        break;
                    case 'event_host':
                        if (!/[A-Za-z]/.test(data[prop]))
                            this.errors[prop] = 'Please enter a valid host name';
                        else
                            this.errors[prop] = '';
                        break;
                    case 'event_start_time':
                    case 'event_end_time':
                        if (new Date(data[prop]) < new Date())
                            this.errors[prop] = 'Please enter a valid future date';
                        else
                            this.errors[prop] = '';
                        break;
                    default:
                        console.warn(`No such prop exists`);
                }
            }
        }
    }

    return {
        signUpForm: new SignUpForm(),
        eventForm: new EventForm()
    }
})(this, document)
