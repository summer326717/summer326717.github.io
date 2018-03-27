var app = new Vue({
    el: '.main',
    data: {
        login_name: Cookies.get('memb_nick_name'),
        user_name: '',
        user_mobile: '',
        user_pcr: '请选择所在地区',
        detailed_address: '',
        is_default: false,//添加地址时是否勾选弹框
        id_add_addr: false,//是否显示弹框
        sender_list: [],//寄件人地址列表
        receiv_list: [],//收件人列表
        add_type: 1,//1为添加寄件人，2为添加收件人,3位修改寄件人，4为修改收件人
        ex_com_list: [],//快递公司列表
        express_id: 0,//选择的快递公司的id
        is_select_pcr: false,//是否显示选择省市区的弹框
        pcr_list: [],//选择省市区的列表
        cr_list: [],
        r_list: [],
        se_province_id: 0,//用户选择的省ID
        se_province_index: 0,
        se_province_name: '省份/直辖市',//用户选择的省
        se_city_id: 0,//用户选择的市id
        se_city_index: 0,
        se_city_name: '请选择',//用户选择的市
        se_region_id: 0,//用户选择的区id
        se_regin_name: '请选择',//用户选择的区
        select_type: 0,//0为省份，1位市，2位区
        address_id: 0,//修改地址时的地址id
        index: 1,//选择区后隐藏省市区弹框问题
        rev_add_id: 0,
        send_add_id: 0,
        is_pay_order: false,
        order_ids: '',
        change_channel: 0,
        order_amount: 0,
        user_balance: 0,
        surplus_frequency: 0,
        complete_pay: false,
        express_weight: 1,//寄件默认重量
        plat_list: [],//快递对应的平台列表
        platform_id: 0,//平台id
        plat_order_id: '',//订单号
        total_pages: 1,//
        page_no: 1,
        page_size: 10,
        is_all_send: false,//切换批量寄件
        page_txt: '',
        map_list: [],//批量寄件上传后返回的数组
        table_list: [],//上传的表格内容
        complete_pay: false,//已完成弹框
        complete_exp_id: '',//支付成功的快递单号
        all_send_list: '',//查询的表格数据
        is_loading: false,
    },
    created: function () {
        if (sessionStorage.getItem('type') == 2) {
            this.is_all_send = true;
        }
        check_login();
        this.s_get_address(1);
        this.s_get_address(2);
        this.s_get_company();
    },
    methods: {
        hehehe: function (type) {
            //this.is_all_send = !this.is_all_send;
            sessionStorage.setItem('type', type);
        },
        sign_out: sign_out,
        s_get_address: function (type) {
            var data = {
                'type': type
            }
            var _this = this;
            axios_post(data, '/1/token/findTopAddress', function (res) {
                if (type == 1) {
                    _this.sender_list = res.obj;
                    if (_this.sender_list.length > 0) {
                        if (_this.sender_list[0].is_default == 0) {
                            _this.send_add_id = _this.sender_list[0].address_id;
                        }
                    }
                }
                if (type == 2) {
                    _this.receiv_list = res.obj;
                    if (_this.receiv_list.length > 0) {
                        if (_this.receiv_list[0].is_default == 0) {
                            _this.rev_add_id = _this.receiv_list[0].address_id;
                        }
                    }
                }
            })
        },
        s_add_address: function () {
            if (this.user_name == '') {
                alerter('请输入姓名');
                return;
            }
            if (this.user_mobile == '') {
                alerter('请输入手机号码');
                return;
            }
            //if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.user_mobile)) || !(/^(\d3, 4 |\d{3, 4 } -)?\d{7,8}$/).test(this.user_mobile)) {
            //    alerter('请输入正确手机号或电话');
            //    return;
            //}
            if (this.se_province_id == '') {
                alerter('请选择省份');
                return;
            }
            if (this.se_city_id == '') {
                alerter('请选择城市级');
                return;
            }
            if (this.se_region_id == '') {
                alerter('请选择区县级');
                return;
            }
            if (this.detailed_address == '') {
                alerter('请输入详细地址');
                return;
            }
            if (this.is_default) {
                var be_default = 0;
            } else {
                var be_default = 1;
            }
            var data = {
                'user_name': this.user_name,
                'user_mobile': this.user_mobile,
                'province_id': this.se_province_id,
                'city_id': this.se_city_id,
                'region_id': this.se_region_id,
                'detailed_address': this.detailed_address,
                'type': this.add_type,
                'is_default': be_default
            }
            var _this = this;
            axios_post(data, '/1/token/addAddress', function () {
                alerter('添加成功！');
                _this.s_get_address(1);
                _this.s_get_address(2);
                _this.id_add_addr = false;
            })
        },
        check_weight: function () {
            if (this.express_weight.length == 1) {
                if (isNaN(this.express_weight)) {
                    this.express_weight = 1;
                }
            } else {
                if (isNaN(this.express_weight)) {
                    this.express_weight = this.express_weight.slice(0, this.express_weight.length - 1);
                }
                if (this.express_weight.indexOf('.') != -1) {
                    this.express_weight = this.express_weight.slice(0, this.express_weight.length - 1);
                }
            }
        },
        s_get_company: function () {
            var _this = this;
            axios_post('', '/1/findExpCompany', function (res) {
                console.log(res,"1234");
                _this.ex_com_list = res.obj;
                _this.express_id = res.obj[0].express_id;
                _this.get_plat();
            })
        },
        edit_addr: function () {
            if (this.user_name == '') {
                alerter('请输入姓名');
                return;
            }
            if (this.user_mobile == '') {
                alerter('请输入手机号码');
                return;
            }
            //if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.user_mobile)) || !(/^(\d3, 4 |\d{3, 4 } -)?\d{7,8}$/).test(this.user_mobile)) {
            //    alerter('请输入正确手机号或电话');
            //    return;
            //}
            if (this.se_province_id == '') {
                alerter('请选择省份');
                return;
            }
            if (this.se_city_id == '') {
                alerter('请选择城市级');
                return;
            }
            if (this.se_region_id == '') {
                alerter('请选择区县级');
                return;
            }
            if (this.detailed_address == '') {
                alerter('请输入详细地址');
                return;
            }
            if (this.is_default) {
                var be_default = 0;
            } else {
                var be_default = 1;
            }
            if (this.add_type == 3) {
                var type = 1;
            } else {
                var type = 2;
            }
            var data = {
                'address_id': this.address_id,
                'user_name': this.user_name,
                'user_mobile': this.user_mobile,
                'province_id': this.se_province_id,
                'city_id': this.se_city_id,
                'region_id': this.se_region_id,
                'detailed_address': this.detailed_address,
                'type': type,
                'is_default': be_default
            }
            var _this = this;
            axios_post(data, '/1/token/editAddress', function (res) {
                alerter('修改成功！');
                _this.s_get_address(1);
                _this.s_get_address(2);
                _this.id_add_addr = false;
            })
        },
        get_detail: function (address_id) {
            this.id_add_addr = true;
            this.address_id = address_id;
            var data = {
                'address_id': address_id
            }
            var _this = this;
            axios_post(data, '/1/token/findAddressById', function (res) {
                _this.user_name = res.obj.name;
                _this.se_province_id = res.obj.province_id;
                _this.user_mobile = res.obj.phone;
                _this.se_city_id = res.obj.city_id;
                _this.se_region_id = res.obj.region_id;
                _this.detailed_address = res.obj.detailed_address;
                if (res.obj.is_default == 0) {
                    _this.is_default = true;
                }
                _this.user_pcr = res.obj.province_name + res.obj.city_name + res.obj.region_name;
            })
        },
        to_default: function (address_id) {
            var data = {
                'address_id': address_id,
                'type': this.add_type
            }
            var _this = this;
            axios_post(data, '/1/token/editDefault', function (res) {
                alerter('修改为默认地址成功');
                _this.s_get_address(1);
                _this.s_get_address(2);
            })
        },
        get_province: function () {
            var _this = this;
            axios_post('', '/1/findAllProvincialData', function (res) {
                _this.pcr_list = res.obj;
                _this.select_type = 0;
            })
        },
        select_province: function (id, dict_id, name) {
            this.se_province_name = name;
            this.se_province_id = dict_id;
            this.se_province_index = id;
            this.get_city(id);
        },
        get_city: function (id) {
            if (id < 0) {
                alerter('请先选择省份;');
                return;
            }
            this.cr_list = this.pcr_list[id].city_list;
            this.select_type = 1;
        },
        select_city: function (id, dict_id, name) {
            this.se_city_name = name;
            this.se_city_id = dict_id;
            this.se_city_index = id;
            this.get_region(id);
        },
        get_region: function (id) {
            if (id < 0) {
                alerter('请先选择市;');
                return;
            }
            this.r_list = this.cr_list[id].area_list;
            this.select_type = 2;
        },
        select_region: function (id, dict_id, name) {
            this.se_regin_name = name;
            this.se_region_id = dict_id;
            this.index = 2;
            this.is_select_pcr = false;
            this.user_pcr = this.se_province_name + this.se_city_name + this.se_regin_name;
        },
        test_click: function () {
            this.is_select_pcr = false;
        },
        open_add_addr: function () {
            this.user_name = '';
            this.user_mobile = '';
            this.se_province_id = 0;
            this.se_city_id = 0;
            this.se_region_id = 0;
            this.detailed_address = '';
            this.se_province_name = '省份/直辖市';
            this.se_city_name = '请选择';
            this.se_regin_name = '请选择';
            this.user_pcr = '请选择所在地区';
            this.id_add_addr = true;
            this.is_default = false;
            this.get_province()
        },
        open_pcr: function () {
            if (this.index == 2) {
                this.is_select_pcr = false
                this.index = 1;
            } else {
                this.is_select_pcr = true
            }
        },
        build_order: function () {
            if (this.send_add_id <= 0) {
                alerter('请选择寄件人地址');
                return;
            }
            if (this.rev_add_id <= 0) {
                alerter('请选择收件人地址');
                return;
            }
            var w = parseFloat(this.express_weight);
            var reg = /^(-|\+)?\d+$/
            if (w == '' || w == 0 || !reg.test(w)) {
                alerter('请输入正确重量');
                return;
            }
            if (this.express_id <= 0) {
                alerter('请选择快递');
                return;
            }
            if (this.platform_id <= 0) {
                alerter('请选择平台');
                return;
            }
            if (this.plat_order_id == '') {
                alerter('请输入平台编号');
                return;
            }
            var data = {
                'send_add_id': this.send_add_id,
                'rev_add_id': this.rev_add_id,
                'express_id': this.express_id,
                'express_weight': this.express_weight,
                'goods_name': '',
                'platform_id': this.platform_id,
                'platform_number': this.plat_order_id
            }
            var _this = this;
            axios_post(data, '/1/token/sendOnePackage', function (res) {
                if (res.mark == 0) {
                    alerter('提交成功');
                    _this.is_pay_order = true;
                    _this.order_ids = res.obj.eb_ord_id;
                    _this.order_amount = res.obj.amount;
                    _this.user_balance = res.obj.user_balance;
                    _this.surplus_frequency = res.obj.surplus_frequency;
                } else {
                    alerter(res.tip);
                }
            })
        },
        select_rev_add_id: function (address_id) {
            this.rev_add_id = address_id;
        },
        select_send_add_id: function (address_id) {
            this.send_add_id = address_id;
        },
        send_pay_order: function () {
            if (this.is_all_send) {
                if (this.map_list.eb_ord_id == '') {
                    alerter('支付时的批量订单号没有获取到');
                    return;
                }
            } else {
                if (this.order_ids == '') {
                    alerter('支付时的订单号没有获取到');
                    return;
                }
            }
            if (this.change_channel == 0) {
                alerter('请选择支付方式');
                return;
            }
            if (this.change_channel == 3) {
                if (this.order_amount > this.user_balance) {
                    alerter('账户余额不足，可前往账户管理充值');
                    return;
                }
            }
            if (this.change_channel == 4) {
                if (this.surplus_frequency <= 0) {
                    alerter('暂无可用抵扣券，可前往账户管理购买');
                    return;
                }
            }
            if (!this.is_all_send) {
                var data = {
                    'order_ids': this.order_ids,
                    'change_channel': this.change_channel
                }
            } else {
                var data = {
                    'order_ids': this.map_list.eb_ord_id,
                    'change_channel': this.change_channel
                }
            }
            var _this = this;
            console.log(data,'123');
            axios_post(data, '/1/token/orderPay', function (res) {
                console.log(res)
                if (_this.change_channel == 1) {
                    document.getElementById('cou_code').innerHTML = res.obj;
                    document.forms['alipaysubmit'].submit()
                    _this.complete_pay = true;
                }
                else {
                    if (_this.is_all_send) {
                        _this.map_list.state = 2;
                        _this.get_all_table();
                    } else {
                        _this.complete_exp_id = res.obj.express_number;
                        _this.complete_pay = true;
                    }
                    alerter('支付成功');
                    _this.is_pay_order = false;
                }
            })
        },
        get_plat: function () {
            var data = {
                'express_id': this.express_id
            }
            var _this = this;
            axios_post(data, '/1/token/findPlatform', function (res) {
                if (res.mark == 0) {
                    _this.plat_list = res.obj;
                    _this.platform_id = res.obj[0].platform_id;
                }
            });
        },
        upload_file: function () {
            if (this.send_add_id == 0) {
                alerter('请先选择寄件人地址');
                document.getElementById('file').value = '';
                return;
            }
            var $ipt_file = document.getElementById('file').files[0];
            var reg = /(.xlsx|.xls)$/;
            //var size = $ipt_file.size / 1024;
            //if (size > 2000) {
            //    alerter("文件不能大于2M");
            //    return false;
            //}
            if (reg.test($ipt_file.name)) {
                var _this = this;
                _this.is_loading = true;
                $("#upload_file").ajaxForm({
                    headers: getHeader(Cookies.get('token')),
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(Decrypt(window.key, res));
                        if (res.mark == 0) {
                            _this.table_list = res.obj;
                            //提交批量寄件信息
                            var data = {
                                'send_add_id': _this.send_add_id,
                                'mapList': res.obj
                            }
                            axios_post(data, '/1/token/sendMorePackage', function (res) {
                                if (res.mark == 0) {
                                    //获取批量信息
                                    _this.map_list = res.obj;
                                    _this.map_list.send_time = get_time(_this.map_list.send_time);
                                    _this.user_balance = res.obj.user_balance;
                                    _this.surplus_frequency = res.obj.surplus_frequency;
                                    _this.get_all_table();
                                } else {
                                    alerter(res.tip);
                                    _this.is_loading = false;
                                }
                            });
                        } else {
                            alerter(res.tip);
                            _this.is_loading = false;
                        }
                        document.getElementById('file').value = '';
                    }, error: function (res) {
                        _this.is_loading = false;
                        document.getElementById('file').value = '';
                        alerter('接口请求错误');
                    }
                }).submit();
            } else {
                alerter('请上传Excel表格');
            }
        },
        upload: function () {
            var file = document.getElementById('file');
            file.click();
        },
        all_pay: function () {
            if (this.map_list.total_amount) {
                this.is_pay_order = true;
            } else {
                alerter('请先导入订单');
            }
        },
        get_all_table: function () {
            var data = {
                'page_no': this.page_no,
                'page_size': this.page_size,
                'user_info_id': this.map_list.user_info_id,
                'order_number': this.map_list.ord_number
            }
            var _this = this;
            axios_post(data, '/1/token/findCollects', function (res) {
                if (res.mark == 0) {
                    _this.all_send_list = res.obj.items;
                    _this.total_pages = res.obj.total_pages;
                } else {
                    alerter(res.tip);
                }
                _this.is_loading = false;
            });
        },
        export_excel: function () {
            var eb_ord_id = this.map_list.eb_ord_id;
            if (eb_ord_id == '' || eb_ord_id == null || eb_ord_id == undefined) {
                alerter('支付订单后，才能导出表格');
                return;
            }
            if (this.map_list.state == 1) {
                alerter('支付订单后，才能导出表格');
                return;
            }
            if (this.all_send_list[0].express_number == undefined || this.all_send_list[0].express_number == null || this.all_send_list[0].express_number == '') {
                alerter('无快递单号，无法导出');
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
        },
        delete_order: function () {//删除订单
            var data = {
                eb_ord_id: this.map_list.eb_ord_id
            }
            var _this = this;
            axios_post(data, '/1/token/cancelOrder', function (res) {
                if (res.mark == 0) {
                    _this.map_list = [];
                    _this.all_send_list = [];
                    alerter('取消成功');
                } else {
                    alerter(res.tip);
                }
            });
        },
        btn_click: function (i) {
            if (i != this.page_no) {
                this.page_no = i;
                this.get_all_table();
            }
        },
        page_click: function () {
            this.get_all_table();
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
            this.get_all_table();
        }
    },
    computed: computed
});