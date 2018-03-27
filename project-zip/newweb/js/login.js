var app = new Vue({
    el: '.main',
    data: {
        login_type: 1,//1.为密码登录、2.为快速登录
        l_username: '',//登录用户名
        l_password: '',//登录密码
        l_code: '',//
        r_username: '',//注册用户名
        r_password: '',//注册密码
        r_code: '',//注册的验证码
        f_username: '',//忘记密码用户名
        f_password: '',//忘记密码密码
        f_code: '',//忘记密码的验证码
        is_wait: false,//获取验证码成功后，60秒倒计时
        checked: false,//注册的复选框
        num: 60,
        is_get_code: true,
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
        l_login: function () {
            if (this.l_username == '') {
                alerter('请输入手机号');
                document.getElementById('l_username').focus();
                return;
            }
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.l_username))) {
                alerter('请输入正确手机号');
                document.getElementById('l_username').focus();
                return;
            }
            if (this.login_type == 1) {
                if (this.l_password == '') {
                    alerter('请输入密码');
                    document.getElementById('l_password').focus();
                    return;
                }
                var data = {
                    'memb_phone': this.l_username,
                    'memb_password': this.l_password
                };
                axios_post_login(data, '/1/login', function (res) {
                    Cookies.set('token', res.obj.token, { expires: Infinity });
                    Cookies.set('memb_nick_name', res.obj.memb_nick_name, { expires: Infinity });
                    Cookies.set('memb_phone', res.obj.memb_phone, { expires: Infinity });
                    location.href = 'views/send.html';
                })
            }
            if (this.login_type == 2) {
                if (this.l_code == '') {
                    alerter('请输入验证码');
                    document.getElementById('l_code').focus();
                    return;
                }
                var data = {
                    'memb_phone': this.l_username,
                    'verification_code': this.l_code
                };
                axios_post_login(data, '/1/msgLogin', function (res) {
                    Cookies.set('token', res.obj.token, { expires: Infinity });
                    Cookies.set('memb_nick_name', res.obj.memb_nick_name, { expires: Infinity });
                    Cookies.set('memb_phone', res.obj.memb_phone, { expires: Infinity });
                    location.href = 'views/send.html';
                })
            }
        },
        l_get_code: function () {
            if (this.l_username == '') {
                alerter('请输入手机号');
                document.getElementById('l_username').focus();
                return;
            }
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.l_username))) {
                document.getElementById('l_username').focus();
                alerter('请输入正确手机号');
                return;
            }
            var data = {
                'phoneno': this.l_username
            }
            var _this = this;
            axios_post_login(data, '/1/sendLoginMsg', function (res) {
                _this.get_gray();
                _this.is_get_code = false;
                alerter('手机验证码获取成功');
            })
        },
        r_get_code: function () {
            if (this.r_username == '') {
                alerter('请输入手机号');
                document.getElementById('r_username').focus();
                return;
            }
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.r_username))) {
                document.getElementById('r_username').focus();
                alerter('请输入正确手机号');
                return;
            }
            var data = {
                'phoneno': this.r_username
            }
            var _this = this;
            axios_post(data, '/1/sendRegMsg', function (res) {
                _this.get_gray();
                _this.is_get_code = false;
                alerter('手机验证码获取成功');
            })
        },
        r_register: function () {
            if (this.r_username == '') {
                alerter('请输入手机号');
                document.getElementById('r_username').focus();
                return;
            }
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.r_username))) {
                document.getElementById('r_username').focus();
                alerter('请输入正确手机号');
                return;
            }
            if (this.r_code == '') {
                alerter('请输入验证码');
                document.getElementById('r_code').focus();
                return;
            }
            if (this.r_password == '') {
                alerter('请输入密码');
                document.getElementById('r_password').focus();
                return;
            }
            if (this.checked == false) {
                alerter('请勾选用户协议');
                return;
            }
            var data = {
                'memb_phone': this.r_username,
                'memb_password': this.r_password,
                'verification_code': this.r_code,
                'promote_code': 0
            }
            axios_post(data, '/1/register', function (res) {
                location.href = '../index.html';
            })
        },
        f_get_code: function () {
            if (this.f_username == '') {
                alerter('请输入手机号');
                document.getElementById('f_username').focus();
                return;
            }
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.f_username))) {
                document.getElementById('f_username').focus();
                alerter('请输入正确手机号');
                return;
            }
            var data = {
                'phoneno': this.f_username
            }
            var _this = this;
            axios_post(data, '/1/sendForgetPassMsg', function (res) {
                _this.get_gray();
                alerter('手机验证码获取成功');
                _this.is_get_code = false;
            })
        },
        f_update_pwd: function () {
            if (this.f_username == '') {
                alerter('请输入手机号');
                document.getElementById('f_username').focus();
                return;
            }
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.f_username))) {
                alerter('请输入正确手机号');
                document.getElementById('f_username').focus();
                return;
            }
            if (this.f_code == '') {
                alerter('请输入验证码');
                document.getElementById('f_code').focus();
                return;
            }
            if (this.f_password == '') {
                alerter('请输入密码');
                document.getElementById('f_password').focus();
                return;
            }
            var data = {
                'memb_phone': this.f_username,
                'memb_password': this.f_password,
                'verification_code': this.f_code
            }
            axios_post(data, '/1/forgetPwd', function (res) {
                location.href = '../index.html';
            })
        }
    }
})