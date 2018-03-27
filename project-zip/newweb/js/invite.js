var app = new Vue({
    el: '.main',
    data: {
        login_name: Cookies.get('memb_nick_name'),
        invited_num: 0,
        user_id: 0,
        invite_url: '',
    },
    created: function () {
        check_login();
        this.get_data();
    },
    methods: {
        sign_out: sign_out,
        get_data: function () {
            var _this = this;
            axios_post('', '/1/token/findUserId', function (res) {
                if (res.mark == 0) {
                    _this.user_id = res.obj.user_info_id;
                    _this.invited_num = res.obj.invitation_num;
                    var host_url = location.host
                    _this.invite_url = 'http://' + host_url + '/views/activity.html?promote_code=' + _this.user_id + "&channel_id=1";
                    /*用户邀请二维码*/
                    jQuery('#qrcodeCanvas').qrcode({
                        render: "canvas",
                        text: _this.invite_url,
                        width: "100",//二维码的宽度
                        height: "100",//二维码的高度
                        background: "#ffffff",//二维码的后景色
                        foreground: "#000000",//二维码的前景色
                        //src: '../images/img_06.png'//二维码中间的图片
                    });
                } else {
                    alerter(res.tip);
                }
            });
        }
    }
});