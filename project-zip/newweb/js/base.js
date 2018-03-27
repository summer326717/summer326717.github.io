//其他接口
function axios_post(data, url, completion) {
    msg.loader();
    axios.get('../config.json')
        .then(function (res) {
            var con_url = res.data.url;
            window.con_url = con_url;
            window.key = res.data.key;
            var time = Date.parse(new Date());
            var hash = hex_md5(time + "hotol");
            var token = Cookies.get('token');
            if (token == undefined || token == '' || token == null) {
                token = '';
            }
            time = Encrypt(res.data.key, time);
            hash = Encrypt(res.data.key, hash);
            console.log(data);
            axios({
                method: 'post',
                url: con_url + url,
                dataType: 'text',
                data: Encrypt(res.data.key, JSON.stringify(data)),
                headers: {
                    "token": token,
                    "version": "1",
                    "client_type": "4",
                    "Timestamp": time,
                    "SignInfo": hash,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            }).then(function (resp) {
                resp = JSON.parse(Decrypt(res.data.key, resp.data));
                console.log(resp);
                if (resp.mark == 0) {
                    completion(resp);
                } else if (resp.mark == 101 || resp.mark == 100) {
                    location.href = '../index.html';
                } else {
                    completion(resp);
                }
                msg.hide();
            }).catch(function (error) {
                msg.hide();
                alerter(error);
            });
        });
}
//登录接口
function axios_post_login(data, url, completion) {
    msg.loader();
    axios.get('config.json')
        .then(function (res) {
            var con_url = res.data.url;
            var time = Date.parse(new Date());
            var hash = hex_md5(time + "hotol");
            var token = Cookies.get('token');
            if (token == undefined || token == '' || token == null) {
                token = '';
            }
            time = Encrypt(res.data.key, time);
            hash = Encrypt(res.data.key, hash);
            console.log(data);
            axios({
                method: 'post',
                url: con_url + url,
                dataType: "text",
                data: Encrypt(res.data.key, JSON.stringify(data)),
                headers: {
                    "token": token,
                    "version": "1",
                    "client_type": "4",
                    "Timestamp": time,
                    "SignInfo": hash,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            }).then(function (resp) {
                resp = JSON.parse(Decrypt(res.data.key, resp.data));
                console.log(resp);
                if (resp.mark == 0) {
                    completion(resp);
                } else {
                    alerter(resp.tip);
                }
                msg.hide();
            }).catch(function (error) {
                msg.hide();
                alerter(error);
            });
        });
}
function getHeader(token) {
    var time = Date.parse(new Date());
    var hash = hex_md5(time + "hotol");
    time = Encrypt(window.key, time);
    hash = Encrypt(window.key, hash);
    if (token == null) {
        token = "";
    }
    var headers = {
        "token": token,
        "version": "1",
        "client_type": "4",
        "Timestamp": time,
        "SignInfo": hash,
        "Access-Control-Allow-Origin": "*",
    };
    return headers;
}
//加密
function Encrypt(key, word) {
    var key = CryptoJS.enc.Utf8.parse(key);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}
//解密
function Decrypt(key, word) {
    var key = CryptoJS.enc.Utf8.parse(key);
    var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
//弹框
function alerter(msg) {
    var alerter = document.createElement("div");
    alerter.id = "alerter";
    alerter.setAttribute("class", "alerter");
    var body = document.body;
    var html = "<span>" + msg + "</span>";
    alerter.innerHTML = html;
    body.appendChild(alerter);

    setTimeout(function () {
        alerter.remove();
    }, 3000);
}
var msg = {
    loader: function () {
        var loader = document.createElement("div");
        loader.id = "loader";
        loader.setAttribute("class", "loader");
        var body = document.body;
        body.appendChild(loader);
    },
    hide: function () {
        var alerter = document.getElementById("loader");
        alerter.remove();
    }
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
var computed = {
    indexs: function () {
        var left = 1;
        var right = this.total_pages;
        var ar = [];
        if (this.total_pages >= 5) {
            if (this.page_no > 3 && this.page_no < this.total_pages - 2) {
                left = this.page_no - 2
                right = this.page_no + 2
            } else {
                if (this.page_no <= 3) {
                    left = 1
                    right = 5
                } else {
                    right = this.total_pages
                    left = this.total_pages - 4
                }
            }
        }
        while (left <= right) {
            ar.push(left)
            left++
        }
        return ar
    },
    dateList: function () {
        var currentMonthLength = new Date(this.y_now_year, this.y_now_month + 1, 0).getDate()
        var dateList = Array.from({ length: currentMonthLength }, (val, index) => {
            return {
                currentMonth: true,
                value: index + 1
            }
        })
        var startDay = new Date(this.y_now_year, this.y_now_month, 1).getDay()
        var previousMongthLength = new Date(this.y_now_year, this.y_now_month, 0).getDate()

        for (var i = 0, len = startDay; i < len; i++) {
            dateList = [{ previousMonth: true, value: previousMongthLength - i }].concat(dateList)
        }
        for (var i = dateList.length, item = 1; i < 42; i++ , item++) {
            dateList[dateList.length] = { nextMonth: true, value: item }
        }
        return dateList
    }
};
var sign_out = function () {
    Cookies.remove('token');
    Cookies.remove('memb_phone');
    Cookies.remove('memb_nick_name');
    location.href = "../index.html";
}
var check_null = function (e) {
    if (e == null || e == '' || e == undefined || e.length == 0) {
        return false
    } else {
        return true;
    }
}
var check_login = function () {
    if (!check_null(Cookies.get('token'))) {
        location.href = "../index.html";
    }
}
//转换时间格式
function get_time(t) {
    var d = new Date(t);
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var dd = d.getDate();
    var h = d.getHours();
    var mm = d.getMinutes();
    var s = d.getSeconds();
    return y + '-' + e(m) + '-' + e(dd) + ' ' + e(h) + ':' + e(mm) + ':' + e(s);
}
function e(t) {
    if (t < 10) {
        return t = '0' + t;
    } else {
        return t;
    }
}