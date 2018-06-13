<template>
    <div class="ymap">
        <input class="ipt-search" v-model="searchTxt" type="text" placeholder="搜索地址"><button class="btn-search" @click="searchAddress">搜索</button>
        <div class="ymap-top">
            <div class="showmap" id="showmap"></div>
            <div class="marker" style="position:absolute;top:50%;left:50%;margin-left:-8px;margin-top:-30px">
                <img src="http://testwechat.hotol.cn/images/map_04.png">
            </div>
        </div>
        <div class="address-list">
            <div class="item" v-for="(item,i) in addressList" :key="i" @click="selectPlace(item)">
                <p class="title">{{item.title}}</p>
                <p>{{item.address}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {MP} from '../../assets/Common.js'
export default {
    name: 'Baidumap',
    data() {
        return {
            presentPoint: '',
            presentProvince: '',
            presentCity: '',
            presentDistrict: '',
            mapView: '',
            searchTxt: '',
            addressList: []
        }
    },
    mounted() {
        this.initMap();
    },
    methods: {
        //根据浏览器获取当前位置
        initMap() {
            let _this = this;
            MP('G8hkdznEzxZ96hFvXqZiBYoypq352C7L').then(BMap => {
                _this.mapView = new BMap.Map("showmap");
                //拖动地图时的事件
                _this.mapView.addEventListener('dragend', function (res) {
                    //拖动地图后将中心点作为圆点
                    //console.log(_this.mapView.getCenter());
                    //console.log(res);
                    _this.displayPOI(new BMap.Point(_this.mapView.getCenter().lng, _this.mapView.getCenter().lat));
                });
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var localIcon = new BMap.Icon("http://testwechat.hotol.cn/images/map_03.png", new BMap.Size(16, 17));
                        var mk = new BMap.Marker(r.point, { icon: localIcon });
                        _this.mapView.addOverlay(mk);
                        _this.mapView.panTo(r.point);
                        //console.log(r);
                        _this.presentPoint = new BMap.Point(r.point.lng, r.point.lat);
                        //根据浏览器定位获取经纬度，根据经纬度获取周围建筑物信息
                        _this.getUserPlaceList(_this.presentPoint);
                    }
                    else {
                        alert('failed'+this.getStatus());
                    }        
                },{enableHighAccuracy: true})
            })
        },
        //根据当前经纬度获取周围建筑物信息
        getUserPlaceList(point) {
            let _this = this;
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function (rs) {
                var addComp = rs.addressComponents;
                console.log('当前城市为：' + rs.addressComponents.city);
                _this.presentProvince = rs.addressComponents.province;
                _this.presentCity = rs.addressComponents.city;
                _this.presentDistrict = rs.addressComponents.district;
                _this.mapView.enableScrollWheelZoom();
                _this.mapView.centerAndZoom(point, 16);
                _this.displayPOI(point);
            });
        },
        //以当前位置为原点，500米为半径画圆，圈出12个建筑物
        displayPOI(point) {
            let _this = this;
            var mOption = {
                poiRadius: 500,//默认100米
                numPois: 12//默认10个
            }
            var myGeo = new BMap.Geocoder();//创建地址解析实例
            var circle = new BMap.Circle(point, 500);
            this.mapView.addOverlay(circle);//添加一个圆形覆盖物
            circle.hide();//并将该圆隐藏起来
            myGeo.getLocation(point,function mCallback(rs) {
                sessionStorage.setItem('street', rs.addressComponents.street);
                var allPois = rs.surroundingPois;//获取全部POI（该点半径为100米内有6个POI点）
                _this.addressList = allPois;
                //console.log(rs);
            }, mOption);
        },
        //选择地址列表的地址
        selectPlace(item) {
            let itemParams = {
                province: item.province,
                city: item.city,
                address: item.address
            }
            this.$emit('baidumap',item);
            //console.log(item);
        },
        //根据输入的地址搜索
        searchAddress() {
            let _this = this;
            var options = {
                onSearchComplete: function (results) {
                    // 判断状态是否正确
                    if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                        //console.log(results.getCurrentNumPois());
                        _this.addressList = local.getResults().Br;
                        let spoint = local.getResults().getPoi(0).point;//获取第一个智能搜索的结果
                        _this.mapView.centerAndZoom(spoint, 16);                        
                    }
                }
            };
            var local = new BMap.LocalSearch(this.mapView, options);
            local.search(this.searchTxt);
        }
    }
}
</script>

<style scoped>
.ymap {
    height: 100%;
}
.ymap .ipt-search {
    display: inline-block;
    width: 75%;
    padding-left: 5%;
    border: 1px solid #dedede;
    border-radius: 5px;
    line-height: 40px;
    margin-bottom: 30px;
}
.ymap .btn-search {
    color: #dadae8;
    width: 19%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 5px;
    float: right;
    background: #555a79;
    transition: all 0.4s ease-in-out;
}
.ymap .showmap,.ymap .ymap-top {
    height: 250px;
    position: relative;
}
.ymap .address-list .item {
    border-top: 1px solid #dedede;
    font-size: 14px;
    color: #999999;
    padding: 10px 20px;
}
.ymap .address-list .item .title {
    font-size: 16px;
    color: #2c3e50;
}
</style>
