var app = new Vue({
    el: '.main',
    data: {
        login_name: Cookies.get('memb_nick_name'),
        addr_list: [],//地址列表
        total_pages: 0,
        page_no: 1,
        page_size: 10,
        user_name: '',
        user_mobile: '',
        detailed_address: '',
        page_txt: '',
        se_province_id: 0,//用户选择的省ID
        se_province_index: 0,
        se_province_name: '省份/直辖市',//用户选择的省
        se_city_id: 0,//用户选择的市id
        se_city_index: 0,
        se_city_name: '请选择',//用户选择的市
        se_region_id: 0,//用户选择的区id
        se_regin_name: '请选择',//用户选择的区
        user_pcr: '请选择所在地区',
        is_select_pcr: false,
        select_type: 0,
        pcr_list: [],
        is_default: false,
        //id_add_addr: false,
        //is_select_pcr1: false,
        //user_name1: '',
        user_pcr1: '',
        //is_default1: 1,
        address_id: 0,
        //user_mobile1: '',
        //detailed_address1: '',
        //se_province_id1: '',
        //se_province_index1: 0,
        //se_province_name1: '省份/直辖市',//用户选择的省
        //se_city_id1: 0,//用户选择的市id
        //se_city_index1: 0,
        //se_city_name1: '请选择',//用户选择的市
        //se_region_id1: 0,//用户选择的区id
        //se_regin_name1: '请选择',//用户选择的区
        index: 1,
        page_type: getQueryString('type'),
        delete_address_id: 0,
        is_delete: false,
        is_edit: 1,//1为添加，2.修改
    },
    created: function () {
        this.get_data();
        this.get_province();
    },
    methods: {
        sign_out: sign_out,
        get_data: function () {
            var data = {
                'page_no': this.page_no,
                'page_size': this.page_size,
                'type': getQueryString('type'),
            }
            var _this = this;
            axios_post(data, '/1/token/findAddressPage', function (res) {
                if (res.mark == 0) {
                    _this.addr_list = res.obj.items;
                    _this.total_pages = res.obj.total_pages;
                    _this.page_no = res.obj.page_no;
                }
            })
        },
        more_edit: function (address_id) {
            this.get_detail(address_id)
            this.address_id = address_id;
            this.is_edit = 2;
            var y = window.scrollY;
            window.scrollBy(0, -y);
        },
        m_save: function () {
            if (this.is_edit == 1) {
                this.s_add_address();
            }
            if (this.is_edit == 2) {
                this.m_edit_address();
            }
        },
        m_edit_address: function () {
            if (this.user_name == '') {
                alerter('请输入姓名');
                return;
            }
            if (this.user_mobile == '') {
                alerter('请输入手机号码');
                return;
            }
            //if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.user_mobile))) {
            //    alerter('请输入正确手机号');
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
                'address_id': this.address_id,
                'user_name': this.user_name,
                'user_mobile': this.user_mobile,
                'province_id': this.se_province_id,
                'city_id': this.se_city_id,
                'region_id': this.se_region_id,
                'detailed_address': this.detailed_address,
                'type': getQueryString('type'),
                'is_default': be_default
            }
            var _this = this;
            axios_post(data, '/1/token/editAddress', function (res) {
                if (res.mark == 0) {
                    alerter('修改成功');
                    _this.get_data();
                    _this.is_edit = 1;
                    _this.user_name = '';
                    _this.user_mobile = '';
                    _this.se_province_id = 0;
                    _this.se_city_id = 0;
                    _this.se_region_id = 0;
                    _this.user_pcr = '';
                    _this.is_default = false;
                    _this.detailed_address = '';
                } else {
                    alerter(res.tip);
                }
            })
        },
        more_delete: function (address_id) {
            this.delete_address_id = address_id;
            this.is_delete = true;
        },
        comfirm_delete: function () {
            var data = {
                'address_id': this.delete_address_id
            }
            var _this = this;
            axios_post(data, '/1/token/delAddress', function (res) {
                if (res.mark == 0) {
                    alerter('删除成功');
                    _this.is_delete = false;
                    _this.get_data();
                } else {
                    alerter(res.tip);
                }
            })
        },
        more_be_default: function (address_id) {
            var data = {
                'address_id': address_id,
                'type': this.page_type
            }
            var _this = this;
            axios_post(data, '/1/token/editDefault', function (res) {
                if (res.mark == 0) {
                    alerter('修改为默认地址成功');
                    _this.get_data();
                } else {
                    alerter(res.tip);
                }
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
        s_add_address: function () {
            if (this.user_name == '') {
                alerter('请输入姓名');
                return;
            }
            if (this.user_mobile == '') {
                alerter('请输入手机号码');
                return;
            }
            //if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.user_mobile))) {
            //    alerter('请输入正确手机号');
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
                'type': getQueryString('type'),
                'is_default': be_default
            }
            var _this = this;
            axios_post(data, '/1/token/addAddress', function (res) {
                if (res.mark == 0) {
                    alerter('添加成功！');
                    _this.user_name = '';
                    _this.user_mobile = '';
                    _this.se_province_id = 0;
                    _this.se_city_id = 0;
                    _this.se_region_id = 0;
                    _this.user_pcr = '';
                    _this.detailed_address = '';
                    _this.is_default = false;
                    _this.get_data();
                } else {
                    alerter(res.tip);
                }
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
            this.is_select_pcr = false;
            this.index = 2;
            this.user_pcr = this.se_province_name + this.se_city_name + this.se_regin_name;
        },
        test_click: function () {
            this.is_select_pcr = false;
            //this.is_select_pcr1 = false;
        },
        get_detail: function (address_id) {
            this.id_add_addr = true;
            this.address_id = address_id;
            var data = {
                'address_id': address_id
            }
            var _this = this;
            axios_post(data, '/1/token/findAddressById', function (res) {
                if (res.mark == 0) {
                    _this.user_name = res.obj.name;
                    _this.se_province_id = res.obj.province_id;
                    _this.user_mobile = res.obj.phone;
                    _this.se_city_id = res.obj.city_id;
                    _this.se_region_id = res.obj.region_id;
                    _this.detailed_address = res.obj.detailed_address;
                    if (res.obj.is_default == 0) {
                        _this.is_default = true;
                    } else {
                        _this.is_default = false;
                    }
                    _this.user_pcr = res.obj.province_name + res.obj.city_name + res.obj.region_name;
                } else {
                    alerter(res.tip);
                }
            })
        },
        open_pcr: function () {
            if (this.index == 2) {
                this.is_select_pcr1 = false;
                this.is_select_pcr = false;
                this.index = 1;
            }
            else {
                this.is_select_pcr1 = true;
                this.is_select_pcr = true;
            }
        }
    },
    computed: computed
});