//其他接口
function axios_post(data, url, completion) {
    axios.get('../../config.json')
        .then(function (res) {
            var con_url = res.data.con_url;
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
                    "client_type": "3",
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
                    location.href = '../login.html';
                } else {
                    completion(resp);
                }
            }).catch(function (error) {
                alerter(error);
            });
        });
}
//登录接口
function axios_post_login(data, url, completion) {
    axios.get('../config.json')
        .then(function (res) {
            var con_url = res.data.con_url;
            //console.log(res.data.con_url)
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
                    "client_type": "3",
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
            }).catch(function (error) {
                alerter(error);
            });
        });
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
var alerter = function (msg) {
    var alerter = document.createElement("div");
    alert.id = "alerter";
    alerter.setAttribute("class", "alerter");
    var body = document.body;
    var html = "<span>" + msg + "</span>";
    alerter.innerHTML = html;
    body.appendChild(alerter);

    setTimeout(function () {
        alerter.remove();
    }, 3000);
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
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
        location.href = "../login.html";
    }
    if (!check_null(Cookies.get('memb_phone'))) {
        location.href = "../login.html";
    }
    if (!check_null(Cookies.get('memb_nick_name'))) {
        location.href = "../login.html";
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