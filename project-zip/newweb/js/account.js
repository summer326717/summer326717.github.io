var app = new Vue({
    el: '.main',
    data: {
        login_name: Cookies.get('memb_nick_name'),
        cur: 1,
        all: 5,
        page_txt: '',
        is_recharge: false,
        is_buy: false,
        page_no: 1,
        total_pages: 1,
        getpay:false,
        new_jiage:'',
        payaddr:[],
        jiagedangwei:[],
        zsongdangwei:[],
        pay_page:false,
        classtype:1,
        is_pay_order:false,
        surplus:0,
        page_size: 10,
        fund_type: 0,//0全部 1余额充值 2抵扣券购买 3余额支付 4抵扣券支付 5邀请好友
        fund_state: 2,//0成功 1待支付 2全部
        data_list: [],
        user_balance: 0,//用户余额
        surplus_frequency: 0,//用户抵扣券数量
        total_balance: 0,//总余额
        total_frequency: 0,//总抵扣券数量
        recharge_list: [],
        //unit_price: 0,//单价
        coupon_list: [],//购买优惠券列表
        coup_num: 1,//购买优惠券数量
        amount: 0,//默认充值金额
        coupon: 0,//默认购买的套餐
        rech_amount: '',//充值的输入金额
        r_gift_amount: 0,//充值时输入金额的赠送金额
        pay_id: 0,//抵扣券id
        is_activity: false,//是否显示活动
        get_gift:0,
        caul_all:0,
        change_channel: 1,
        complete_pay: false,

    },
    created: function () {
        check_login();
        this.get_data();
        this.get_recharge();
        this.get_price();
    },
    methods: {
        sign_out: sign_out,
        tab_click: function (type) {
            this.fund_type = type;
            this.data_list = [];
            this.get_data()
        },
        status_click: function (type) {
            this.fund_state = type;
            this.data_list = [];
            this.get_data()
        },
        dl_addnew (){
            function isInteger(obj) {
                        return obj%1 === 0
                    }
                    if(!isInteger(this.new_jiage)||this.new_jiage<0){
                        alerter('优惠券必须是正整数');
                            return;
                    }
            if(isNaN(this.new_jiage)){
                alerter('购买数量请输入数字');
                return;
            }else if(parseInt(this.new_jiage)>this.surplus){
                alerter('购买数量不得大于可购数量');
                return;
            }else if(this.new_jiage == ''){
                alerter('购买数量不能为空');
                return;
            }
            // this.new_jiage = '';
            // this.get_gift = 0;
            // this.caul_all  =0;
            this.is_pay_order = true;
            this.getpay  =false;
             clearInterval(this.aa);

        },
        getgift(){
            var me = this;
              
         
            if(me.aa){
                 clearInterval(me.aa);
            }
           
            me.aa= setInterval(function(){ 
                var i = 0 ;
                var jglen = me.jiagedangwei.length;
                    if(me.new_jiage<me.jiagedangwei[0]){ //算应该归于那一区间
                         i = -1;
                         
                    }else if( me.new_jiage>=me.jiagedangwei[jglen-1]){
                        i = jglen-1;
                        
                    }else{
                        console.log( me.jiagedangwei)
                        me.jiagedangwei.forEach(function(v,k){
                            if(me.new_jiage>=me.jiagedangwei[k] && me.new_jiage<=me.jiagedangwei[k+1]){
                                    i=k;
                            }
                        })
                    }
                    me.get_gift =  me.zsongdangwei[i]? me.zsongdangwei[i]:0;
                    me.caul_all = me.new_jiage * me.cost/100;
            },500) 
        },
        getjuan(item){
            this.new_jiage = item.purchased_num;
            this.get_gift =  item.gift_num;
              this.caul_all = this.new_jiage * this.cost/100;
        }, 
        send_pay_order(){

            
            if(this.user_balance/100<this.caul_all&&this.change_channel == 3){
                alerter("账户余额不足")
                return;
            }else{
               
                    var data={
                        'change_channel': 1,
                        'purchased_num':this.new_jiage,
                        'gift_num':this.get_gift
                        }
                       
                     axios_post(data, '/1/token/deductionPay', function (res) {
                        console.log(res,"111")
                        if(res.mark ==0){
                            document.getElementById('cou_code').innerHTML = res.obj;
                            document.forms['alipaysubmit'].submit()
                        }   
                        else{
                            alerter(res.tip);
                            return;
                        }
                    })
                
                 
                }
                
            
        },
        getpayfalse(){
            this.getpay = false;
            clearInterval(this.aa)
        },
        buy_yhj(){
            var data = {};
            var me =this;
            me.jiagedangwei = [];
             me.zsongdangwei = [];
            axios_post(data, '/1/user/menu/list', function (res) {
                if(res.mark == 0){
                    var i=0;
                    res.obj.list.forEach(function(v){
                        me.jiagedangwei.push(v.purchased_num);
                        me.zsongdangwei.push(v.gift_num);
                        v.classtype = i;   //赋class的类型
                            if(i<5){
                                i++;
                            }else{
                                i=5
                            }
                        })
                     function sortNumber(a,b)
                                {
                                return a - b
                                }
                        me.jiagedangwei = me.jiagedangwei.sort(sortNumber); //排序
                        me.zsongdangwei = me.zsongdangwei.sort(sortNumber);
                    var finalrest = [];
                        me.jiagedangwei.forEach(function(v,k){    
                           res.obj.list.forEach(function(v1,k1){
                             if(res.obj.list[k1].purchased_num == v){
                                 finalrest.push(v1)   
                                }   
                           }) 
                                                     
                            
                        })
                        me.payaddr = finalrest;
                        me.surplus = res.obj.surplus;
                        me.cost = res.obj.cost;

                }
            })
           // debugger
            this.getpay = true;
        },
        get_data: function () {
            var data = {
                'page_no': this.page_no,
                'page_size': this.page_size,
                'fund_type': this.fund_type,
                'fund_state': this.fund_state
            }
            var _this = this;
            axios_post(data, '/1/token/findFundChangePage', function (res) {
                console.log(res)
                if (res.mark == 0) {
                    _this.data_list = res.obj.items;
                    for (var i = 0; i < _this.data_list.length; i++) {
                        _this.data_list[i].change_time = get_time(_this.data_list[i].change_time);
                    }
                    _this.total_pages = res.obj.total_pages;
                    _this.user_balance = res.obj.user_balance;
                    _this.surplus_frequency = res.obj.surplus_frequency;
                    _this.total_balance = res.obj.add_balance;
                    _this.total_frequency = res.obj.add_frequency;
                } else {
                    _this.data_list = [];
                }
            })
        },
        get_recharge: function () {
            var _this = this;
            axios_post('', '/1/findRechargePreferen', function (res) {
                if (res.mark == 0) {
                    _this.recharge_list = res.obj;
                    //_this.amount = res.obj[0].pay_amount;
                }
            })
        },
        get_price: function () {
            //var _this = this;
            //axios_post('', '/1/findDeductionPrice', function (res) {
            //    _this.coupon_list = res.obj;
            //})
        },
        select_amount: function (amount) {
            //if (this.is_recharge) {
            //    this.rech_amount = '';
            //    this.r_gift_amount = 0;
            //    this.amount = amount;
            //} else {
            //    this.coupon = amount;
            //}
        },
        recharge_amount: function () {
            if (this.amount == 0) {
                var data = {
                    'change_channel': 1,
                    'amount': this.rech_amount * 100
                }
                if (isNaN(this.rech_amount)) {
                    alerter('请输入充值金额');
                    return;
                }
                if (this.rech_amount == '' || this.rech_amount == 0) {
                    alerter('请输入充值金额');
                    return;
                }
            } else {
                var data = {
                    'change_channel': 1,
                    'amount': this.amount
                }
            }
            var _this = this;
            console.log(data);
            axios_post(data, '/1/token/rechargePay', function (res) {
                if (res.mark == 0) {
                    document.getElementById('rec_code').innerHTML = res.obj;
                    document.forms.alipaysubmit.submit();
                } else {
                    alerter(res.tip);
                }
            })
        },
        less_coupon: function () {
            if (this.coup_num == 1) {
                return;
            }
            this.coup_num--;
        },
        buy_coupon: function () {
            //var data = {
            //    'change_channel': 1,
            //    'pay_id': this.pay_id
            //}
            //console.log(data);
            //axios_post(data, '/1/token/deductionPay', function (res) {
            //    if (res.mark == 0) {
            //        document.getElementById('cou_code').innerHTML = res.obj;
            //        document.forms.alipaysubmit.submit();
            //    } else {
            //        alerter(res.tip);
            //    }
            //})
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
        recharge_gift: function () {
            //this.amount = 0;
            //var l = this.recharge_list.length;
            //for (var i = 0; i < l; i++) {
            //    if (this.recharge_list[0].pay_amount <= this.rech_amount * 100) {
            //        if (this.recharge_list[i].pay_amount > this.rech_amount * 100) {
            //            this.r_gift_amount = this.recharge_list[i - 1].give_amount;
            //            console.log(this.r_gift_amount);
            //            break;
            //        }
            //    } else {
            //        this.r_gift_amount = 0;
            //    }
            //    if (this.recharge_list[l - 1].pay_amount <= this.rech_amount * 100) {
            //        this.r_gift_amount = this.recharge_list[l - 1].give_amount;
            //        console.log(this.r_gift_amount);
            //        break;
            //    }
            //}
        },
    },
    computed: computed
});
//function scroll() {
//    var area = document.getElementById('scrollBox');
//    var con1 = document.getElementById('con1');
//    var con2 = document.getElementById('con2');
//    con2.innerHTML = con1.innerHTML;
//    function scrollUp() {
//        if (area.scrollTop >= con1.offsetHeight) {
//            area.scrollTop = 0;
//        } else {
//            area.scrollTop++;
//        }
//    }
//    var time = 50;
//    var mytimer = setInterval(scrollUp, time);
//    area.onmouseover = function () {
//        clearInterval(mytimer);
//    }
//    area.onmouseout = function () {
//        mytimer = setInterval(scrollUp, time);
//    }
//}
//window.onload = function () {
//    setTimeout(function () {
//        scroll();
//    }, 1000);
//}