var app = new Vue({
    el: '.main',
    data: {
        login_name: Cookies.get('memb_nick_name'),
        page_no: 1,
        page_size: 10,
        total_pages: 1,
        page_txt: '',
        order_list: [],
        order_status: 1,//1.未支付，2.失败，3.成功
        com_list: [],
        express_id: 0,
        start_time: '',
        end_time: '',
        express_number: '',
        is_pay_order: false,
        user_balance: 0,
        surplus_frequency: 0,
        change_channel: 1,
        select_amount: 0,
        order_ids: [],//支付多个订单时的订单编号数组
        order_ids_string: '',//支付多个订单时的订单编号字符串
        order_num: 0,
        all_check: false,
        all_check2: false,
        y_week: ['日', '一', '二', '三', '四', '五', '六'],
        y_month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        y_year: [],
        y_day: [],
        y_now_month: null,
        y_now_year: null,
        y_now_day: null,
        istrue: true,
        date_now: new Date(),
        select_item: 3,
        y_date_show: false,
        last_time: null,
        last_time2: null,
        input_id: 0,//1.是开始时间，2是结束时间
        is_delete: false,
        de_eb_ord_id: 0,
        complete_pay: false,
        is_all_send: false,//切换批量寄件
        com_express_number: '',//支付成功返回的快递单号
    },
    created: function () {
        check_login();
        this.get_data();
        this.y_now_month = this.date_now.getMonth();
        this.y_now_year = this.date_now.getFullYear();
        this.y_now_day = this.date_now.getDate();
        this.yearlist();
    },
    methods: {
        sign_out: sign_out,
        tabclick: function (type) {
            this.page_no = 1;
            this.order_status = type;
            this.$root.last_time = '';
            this.$root.last_time2 = '';
            this.express_number = '';
            this.order_list = [];
            this.get_data();
        },
        get_data: function () {
            if (this.order_status == 1) {
                var data = {
                    'page_no': this.page_no,
                    'page_size': this.page_size
                }
                var _this = this;
                axios_post(data, '/1/token/findNoPayOrderPage', function (res) {
                    if (res.mark == 0) {
                        _this.order_list = res.obj.items;
                        _this.user_balance = res.obj.user_balance;
                        _this.surplus_frequency = res.obj.surplus_frequency;
                        _this.total_pages = res.obj.total_pages;
                        for (var i = 0; i < _this.order_list.length; i++) {
                            _this.order_list[i].is_check = false;
                            _this.order_list[i].send_time = get_time(_this.order_list[i].send_time);
                        }
                    } else {
                        _this.order_list = [];
                    }
                })
            }
            if (this.order_status == 2) {//单件失败
                var data = {
                    'page_no': this.page_no,
                    'page_size': this.page_size
                }
                var _this = this;
                axios_post(data, '/1/token/findFailedOrder', function (res) {
                    if (res.mark == 0) {
                        _this.order_list = res.obj.items;
                        for (var i = 0; i < _this.order_list.length; i++) {
                            _this.order_list[i].send_time = get_time(_this.order_list[i].send_time);
                        }
                        _this.total_pages = res.obj.total_pages;
                    } else {
                        _this.order_list = [];
                    }
                })
            }
            if (this.order_status == 3) {
                this.s_get_company();
                if ((this.last_time == '' && this.last_time2 != '') || (this.last_time != '' && this.last_time2 == '')) {
                    alerter('请选择完整时间');
                    return;
                }
                if (this.last_time != '' && this.last_time != '' && this.last_time2 != '' && this.last_time2 != '') {
                    if (this.last_time == this.last_time2) {
                        alerter('不能选择同一天');
                        return;
                    }
                }
                var data = {
                    'page_no': this.page_no,
                    'page_size': this.page_size,
                    'start_time': this.last_time,
                    'end_time': this.last_time2,
                    'express_id': this.express_id,
                    'express_number': this.express_number
                };
                var _this = this;
                axios_post(data, '/1/token/findFinishedPayOrderPage', function (res) {
                    if (res.mark == 0) {
                        _this.order_list = res.obj.items;
                        _this.total_pages = res.obj.total_pages;
                        for (var i = 0; i < _this.order_list.length; i++) {
                            _this.order_list[i].is_check = false;
                            _this.order_list[i].send_time = get_time(_this.order_list[i].send_time);
                        }
                    } else {
                        _this.order_list = [];
                    }
                });
            }
            if (this.order_status == 4) {//批量未支付
                var data = {
                    'page_no': this.page_no,
                    'page_size': this.page_size,
                };
                var _this = this;
                axios_post(data, '/1/token/findNoPayBatchOrder', function (res) {
                    if (res.mark == 0) {
                        _this.order_list = res.obj.items;
                        _this.total_pages = res.obj.total_pages;
                        for (var i = 0; i < _this.order_list.length; i++) {
                            _this.order_list[i].is_check = false;
                            _this.order_list[i].send_time = get_time(_this.order_list[i].send_time);
                        }
                    } else {
                        _this.order_list = [];
                    }
                });
            }
            if (this.order_status == 5) {//批量订单
                if ((this.last_time == '' && this.last_time2 != '') || (this.last_time != '' && this.last_time2 == '')) {
                    alerter('请选择完整时间');
                    return;
                }
                if (this.last_time != '' && this.last_time != '' && this.last_time2 != '' && this.last_time2 != '') {
                    if (this.last_time == this.last_time2) {
                        alerter('不能选择同一天');
                        return;
                    }
                }
                var data = {
                    'page_no': this.page_no,
                    'page_size': this.page_size,
                    'start_time': this.last_time,
                    'end_time': this.last_time2,
                    'express_number': this.express_number
                };
                var _this = this;
                axios_post(data, '/1/token/findFinishedBatchOrder', function (res) {
                    if (res.mark == 0) {
                        _this.order_list = res.obj.items;
                        _this.total_pages = res.obj.total_pages;
                        for (var i = 0; i < _this.order_list.length; i++) {
                            _this.order_list[i].send_time = get_time(_this.order_list[i].send_time);
                        }
                    } else {
                        _this.order_list = [];
                    }
                });
            }
            if (this.order_status == 6) {//批量失败
                var data = {
                    'page_no': this.page_no,
                    'page_size': this.page_size,
                };
                var _this = this;
                axios_post(data, '/1/token/findFailedBatchOrder', function (res) {
                    if (res.mark == 0) {
                        _this.order_list = res.obj.items;
                        _this.total_pages = res.obj.total_pages;
                        for (var i = 0; i < _this.order_list.length; i++) {
                            _this.order_list[i].send_time = get_time(_this.order_list[i].send_time);
                        }
                    } else {
                        _this.order_list = [];
                    }
                });
            }
        },
        s_get_company: function () {
            var _this = this;
            axios_post('', '/1/findExpCompany', function (res) {
                if (res.mark == 0) {
                    _this.com_list = res.obj;
                }
            })
        },
        r_delete: function (eb_ord_id) {
            this.de_eb_ord_id = eb_ord_id;
            this.is_delete = true;
        },
        com_delete: function () {
            var data = {
                'eb_ord_id': this.de_eb_ord_id,
            }
            var _this = this;
            axios_post(data, '/1/token/cancelOrder', function (res) {
                if (res.mark == 0) {
                    alerter('删除成功');
                    _this.order_list = [];
                    _this.get_data();
                    _this.is_delete = false;
                } else {
                    alerter(res.tip);
                }
            })
        },
        just_pay: function () {
            if (this.order_ids.length == 0) {
                alerter('请选择支付订单');
                return;
            }
            this.order_num = this.order_ids.length;
            this.is_pay_order = true;
        },
        send_pay_order: function () {
            if (this.order_ids.length == 0) {
                alerter('支付时的订单号没有获取到');
                return;
            }
            if (this.change_channel == 0) {
                alerter('请选择支付方式');
                return;
            }
            if (this.change_channel == 3) {
                if (this.select_amount > this.user_balance) {
                    alertlayer('账户余额不足，可前往账户管理充值');
                    return;
                }
            }
            if (this.change_channel == 4) {
                if (this.surplus_frequency <= 0) {
                    alerter('暂无可用抵扣券，可前往账户管理购买');
                    return;
                }
            }
            for (var i = 0; i < this.order_ids.length; i++) {
                if (i == 0) {
                    this.order_ids_string = this.order_ids[i];
                } else {
                    this.order_ids_string = this.order_ids_string + ',' + this.order_ids[i];
                }
            }
            var data = {
                'order_ids': this.order_ids_string,
                'change_channel': this.change_channel
            }
            var _this = this;
            axios_post(data, '/1/token/orderPay', function (res) {
                if (_this.change_channel == 1) {
                    document.getElementById('cou_code').innerHTML = res.obj;
                    document.forms['alipaysubmit'].submit()
                } else {
                    if (_this.order_status == 1) {
                        _this.complete_pay = true;
                        _this.com_express_number = res.obj.express_number;
                    }
                    alerter('支付成功');
                }
                _this.get_data();
                _this.is_pay_order = false;
            })
        },
        page_click: function () {
            this.get_data();
        },
        btn_click: function (d) {
            if (d != this.page_no) {
                this.page_no = d
                this.get_data();
            }
        },
        search_page: function () {
            if (this.page_txt == '') {
                alerter('请输入查询页码');
                return;
            }
            if (isNaN(this.page_txt)) {
                alerter('请输入正确查询页码');
                return;
            }
            if (this.page_txt > this.total_pages) {
                alerter('请选择的页码不大于总页码');
                return;
            }
            this.page_no = parseInt(this.page_txt);
            this.get_data();
        },
        all_select: function () {
            this.select_amount = 0;
            var vm = this;
            if (this.all_check2) {
                this.all_check = false;
                this.all_check2 = false;
            } else {
                this.all_check = true;
                this.all_check2 = true;
            }
            vm.order_list.forEach(item => {
                item.is_check = vm.all_check2;
                if (vm.all_check2) {
                    vm.select_amount = vm.select_amount + item.total_amount;
                    vm.order_ids.push(item.ord_number);
                }
                else {
                    vm.select_amount = 0;
                    vm.order_ids = [];
                }
            });
        },
        single_select: function (is_check, ord_number, total_amount, i) {
            var vm = this;
            setTimeout(function () {
                if (vm.order_list[i].is_check) {
                    vm.select_amount = vm.select_amount + total_amount;
                    vm.order_ids.push(ord_number);
                } else {
                    vm.select_amount = vm.select_amount - total_amount;
                    vm.order_ids.splice(i, 1);
                }
                var order_list = vm.order_list.filter(item => {
                    return item.is_check == true;
                })
                order_list.length == vm.order_list.length ? vm.all_check = true : vm.all_check = false;
            }, 50)
        },
        demo: function () {
            this.input_id = 1;
            if (this.y_date_show) {
                this.y_date_show = false;
            } else {
                this.y_date_show = true;
            }
        },
        demo2: function () {
            this.input_id = 2;
            this.select_item = 3;
            if (this.y_date_show) {
                this.y_date_show = false;
            } else {
                this.y_date_show = true;
            }
        },
        check_selct: function (item) {
            if (this.input_id == 1) {
                if (this.last_time2 != null) {//如果选了结束时间，并且开始时间要小于结束时间，那么unselected就要显示
                    if (item.previousMonth) {
                        var start_time = new Date(this.y_now_year + '-' + this.check_number(this.y_now_month) + '-' + this.check_number(item.value));
                    } else {
                        var start_time = new Date(this.y_now_year + '-' + this.check_number(this.y_now_month + 1) + '-' + this.check_number(item.value));
                    }
                    var end_time = new Date(this.last_time2);
                    if (start_time > end_time) {
                        return true;
                    }
                    if (item.nextMonth) {
                        return true;
                    }
                }
            }
            if (this.input_id == 2) {
                if (this.last_time != null) {//如果选了开始时间，那么unselected就要显示
                    if (item.nextMonth) {
                        var end_time = new Date(this.y_now_year + '-' + this.check_number(this.y_now_month + 2) + '-' + this.check_number(item.value));
                    } else {
                        var end_time = new Date(this.y_now_year + '-' + this.check_number(this.y_now_month + 1) + '-' + this.check_number(item.value));
                    }
                    var start_time = new Date(this.last_time);
                    if (start_time > end_time) {
                        return true;
                    }
                    if (item.previousMonth) {
                        return true;
                    }
                }
            }
        },
        check_time: function (item) {
            if (this.last_time != null) {//如果选了开始时间，那么active为开始时间
                var c_m = this.last_time.substr(5, 2);//选择时间的月份
                c_m = parseInt(c_m) - 1;
                if (c_m == this.y_now_month) {
                    if (item.value == this.y_now_day && item.currentMonth) {
                        return true;
                    }
                }
            } else {
                if (this.y_now_day == item.value) {
                    return true;
                }
            }
        },
        check_number: function (e) {
            if (e < 10) {
                e = '0' + e;
            }
            return e;
        },
        select_month: function (i) {
            this.y_now_month = i;
            this.select_item = 3;
        },
        select_year: function (i) {
            this.y_now_year = i;
            this.select_item = 1;
        },
        select_day: function (item) {
            if (this.input_id == 1) {
                if (this.last_time2 != null) {//选了结束时间
                    var start_time = new Date(this.last_time2);
                    var end_time = new Date(this.y_now_year + '-' + this.check_number(this.y_now_month + 1) + '-' + this.check_number(item.value));
                    if (item.nextMonth) {//选了结束时间下个月不能点
                        return;
                    }
                    if (item.currentMonth) {
                        if (end_time > start_time) {//选了结束时间，开始时间不能大于结束时间
                            return;
                        }
                    }
                }
                this.y_date_show = false;
                this.y_now_day = item.value;
                if (item.previousMonth) {
                    this.y_now_month = this.y_now_month - 1;
                }
                if (item.nextMonth) {
                    this.y_now_month = this.y_now_month + 1;
                }
                this.last_time = this.y_now_year + '-' + this.check_number(this.y_now_month + 1) + '-' + this.check_number(item.value);
            }
            if (this.input_id == 2) {
                if (this.last_time != null) {//选了开始时间
                    var start_time = new Date(this.last_time);
                    var end_time = new Date(this.y_now_year + '-' + this.check_number(this.y_now_month + 1) + '-' + this.check_number(item.value));
                    if (item.previousMonth) {
                        return;
                    }
                    if (item.currentMonth) {
                        if (end_time < start_time) {
                            return;
                        }
                    }
                }
                this.y_date_show = false;
                this.y_now_day = item.value;
                if (item.previousMonth) {
                    this.y_now_month = this.y_now_month - 1;
                }
                if (item.nextMonth) {
                    this.y_now_month = this.y_now_month + 1;
                }
                this.last_time2 = this.y_now_year + '-' + this.check_number(this.y_now_month + 1) + '-' + this.check_number(item.value);
            }
        },
        yearlist: function () {
            this.y_year = [];
            var arr_item;
            for (var i = 0; i < 12; i++) {
                if (i < 5) {
                    arr_item = this.y_now_year - i;
                    this.y_year.unshift(arr_item);
                } else {
                    arr_item = this.y_now_year + i - 4;
                    this.y_year.push(arr_item);
                }
            }
        },
        select_y: function () {
            this.yearlist();
            this.select_item = 2;
        },
        select_m: function () {
            this.select_item = 1;
        },
        before_select: function () {
            if (this.select_item == 2) {
                var arr_item = this.y_year[0];
                this.y_year = [];
                for (var i = 0; i < 12; i++) {
                    arr_item = arr_item - 1;
                    this.y_year.unshift(arr_item);
                }
            }
            if (this.select_item == 3) {
                this.y_now_month = this.y_now_month === 0 ? 0 : this.y_now_month - 1
            }
        },
        after_select: function () {
            if (this.select_item == 2) {
                var arr_item = this.y_year[11];
                this.y_year = [];
                for (var i = 0; i < 12; i++) {
                    arr_item = arr_item + 1;
                    this.y_year.push(arr_item);
                }
            }
            if (this.select_item == 3) {
                this.y_now_month = this.y_now_month === 11 ? 11 : this.y_now_month + 1
            }
        },
        r_explore: function (eb_ord_id) {
            var eb_ord_id = eb_ord_id;
            if (eb_ord_id == '' || eb_ord_id == null || eb_ord_id == undefined) {
                alerter('支付订单后，才能导出表格');
                return;
            }
            axios.get('../config.json')
                .then(function (res) {
                    var con_url = res.data.url;
                    var data = 'eb_ord_id=' + eb_ord_id;
                    var Timestamp = Date.parse(new Date());
                    var SignInfo = hex_md5(Timestamp + "hotol");
                    Timestamp = Encrypt(res.data.key, Timestamp);
                    SignInfo = Encrypt(res.data.key, SignInfo);
                    Timestamp = encodeURIComponent(Timestamp);
                    SignInfo = encodeURIComponent(SignInfo);
                    var token = Cookies.get('token');
                    window.location.href = con_url + '/1/fileToken/exportOrders?' + data + '&version=3&client_type=4&Timestamp=' + Timestamp + '&SignInfo=' + SignInfo + '&token=' + token;
                });
        }
    },
    computed: computed
});