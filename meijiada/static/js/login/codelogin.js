new Vue({
    el: '.wrap',
    data: {
        username: "",
        password: ""
    },
    methods: {
        nowLogin: function () {
            if (this.password) {
                return;
            }
            let json = {
                username: this.username,
                password: this.password
            };
        },
        goHistory: function () {
            location.go(-1);
        },
        toRegister: function () {
            location.href = './register.html'
        },
        pwdLogin: function () {
            location.href = './pwdlogin.html'
        }
    }
})