new Vue({
    el: '.wrap',
    data: {
        username: "",
        password: ""
    },
    methods: {
        pwdLogin: function () {
            location.href = './pwdlogin.html'
        }
    }
})