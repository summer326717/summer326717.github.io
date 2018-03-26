<template>
    <div>
        <div class="header">
            <span class="left back" @click='goHistory'>
                <img src="../../static/images/06.png">
            </span>
            <span>楼盘</span>
        </div>
        <div class="hoursedetail">
            <div class="top">
                <img src="../../static/images/img_01.png">
            </div>
            <div class="hdetail">
                <p>
                    <span class="ltit">城建万科城</span>
                    <span class="label">住宅</span>
                    <span class="label">在售</span>
                </p>
                <p class="cate">
                    <span>五证齐全</span>
                    <span>品牌房企</span>
                </p>
                <p class="deepgray">均价：
                    <span class="orange">22401元/平</span>
                </p>
                <p class="deepgray">地址：
                    <span class="gray">文三路马腾路口</span>
                </p>
                <p class="deepgray">开盘时间：
                    <span class="gray">2018/03/18</span>
                </p>
            </div>
            <div class="hdcoupon">
                <p>全款8.9 都急死俺打算
                    <button class="get_coupon">领取优惠</button>
                </p>
            </div>
            <div class="bottom">
                <span class="share">分享</span>
                <span class="attention">关注</span>
                <span class="contact" @click='contact'>联系经纪人</span>
                <span class="order" @click='order'>预付定金</span>
            </div>
        </div>
    </div>
</template>
