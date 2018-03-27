new Vue({
    el: '.wrap',
    data: {
        username: "",
        telcode: "",
        isgetcode: true,
        num: 60
    },
    methods: {
        nowLogin: function () {
            if (this.username.trim() == '') {
                this.$dialog.toast({ mes: '请输入手机号或邮箱' });
                return;
            }
            if (this.telcode.trim() == '') {
                this.$dialog.toast({ mes: '请输入验证码' });
                return;
            }
            var json = {
                username: this.username,
                telcode: this.telcode
            };
            var _this = this;
            httpGet('/login', json, function (res) {
                if (res.code == 0) {
                    _this.$dialog.toast({ mes: res.message });
                    location.href = '../index/index.html';
                } else {
                    _this.$dialog.toast({ mes: res.message });
                }
            })
        },
        goHistory: function () {
            location.go(-1);
        },
        toRegister: function () {
            location.href = './register.html'
        },
        pwdLogin: function () {
            location.href = './pwdlogin.html'
        },
        getGray: function () {
            if (this.num == 0) {
                this.isgetcode = true;
                this.num = 60;
            } else {
                this.num--;
                var _this = this;
                setTimeout(_this.getGray, 1000);
            }
        },
        getCode: function () {
            if (this.username.trim() == '') {
                this.$dialog.toast({ mes: '请输入手机号或邮箱' });
                return;
            }
            this.$dialog.loading.open('发送中...');
            var json = {
                username: this.username
            };
            var _this = this;
            httpGet('/login', json, function (res) {
                if (res.code == 0) {
                    _this.isgetcode = false;
                    _this.getGray();
                    _this.$dialog.loading.close();
                    _this.$dialog.toast({ mes: res.message });
                } else {
                    _this.$dialog.toast({ mes: res.message });
                }
            })
        }
    }
})