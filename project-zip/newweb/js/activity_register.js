new Vue({
    el: '#app',
    data: {
        is_see: false,
        r_username: '',
        r_code: '',
        r_password: '',
        is_agree: false,
        is_get_code: true,
        num: 60,
    },
    methods: {
        get_gray: function () {
            if (this.num == 0) {
                this.is_get_code = true;
                this.num = 60;
            } else {
                this.num--;
                var _this = this;
                setTimeout(_this.get_gray, 1000);
            }
        },
        r_get_code: function () {
            if (this.r_username == '') {
                alerter('请输入手机号');
                return;
            }
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.r_username))) {
                alerter('请输入正确手机号');
                return;
            }
            var data = {
                'phoneno': this.r_username
            }
            var _this = this;
            axios_post(data, '/1/sendRegMsg', function (res) {
                if (res.mark == 0) {
                    alerter('获取验证码成功');
                    _this.is_get_code = false;
                    _this.get_gray();
                } else {
                    alerter(res.tip);
                }
            })
        },
        r_submit: function () {
            if (this.r_username == '') {
                alerter('请输入手机号');
                return;
            }
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.r_username))) {
                alerter('请输入正确手机号');
                return;
            }
            if (this.r_code == '') {
                alerter('请输入验证码');
                return;
            }
            if (this.r_password == '') {
                alerter('请输入密码');
                return;
            }
            if (!this.is_agree) {
                alerter('请阅读用户协议');
                return;
            }
            var data = {
                'memb_phone': this.r_username,
                'verification_code': this.r_code,
                'memb_password': this.r_password,
                'promote_code': getQueryString('promote_code'),
                'channel_id': getQueryString('channel_id'),
            }
            axios_post(data, '/1/register', function (res) {
                if (res.mark == 0) {
                    alerter('注册成功');
                    location.href = "../index.html";
                } else {
                    alerter(res.tip);
                }
            })
        }
    }
})