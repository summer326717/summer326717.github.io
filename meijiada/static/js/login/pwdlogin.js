new Vue({
    el: '.wrap',
    data: {
        username: "",
        password: "",
        is_see_pwd: false,
        isremember: false,
    },
    methods: {
        nowLogin: function () {
            if (this.username.trim() == '') {
                this.$dialog.toast({ mes: '请输入手机号或邮箱' });
                return;
            }
            if (this.password.trim() == '') {
                this.$dialog.toast({ mes: '请输入密码' });
                return;
            }
            var json = {
                username: this.username,
                password: this.password
            };
            var _this = this;
            httpGet('/login', json, function (res) {
                if (res.code == 0) {
                    _this.$dialog.toast({ mes: '登录成功' });
                    location.href = '../index/index.html';
                } else {
                    _this.$dialog.toast({ mes: res.message });
                }
            })
        },
        toRemember: function () {
            this.isremember = !this.isremember;
        },
        goHistory: function () {
            history.go(-1);
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