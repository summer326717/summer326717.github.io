new Vue({
    el: '.wrap',
    data: {
        username: "",
        password: "",
        is_see_pwd: false
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
        codeLogin: function () {
            location.href = './codelogin.html'
        },
        changeSee: function () {
            this.is_see_pwd = !this.is_see_pwd;
        }
    }
})