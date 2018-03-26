<template>
  <div>
      <div class="header">
            <span class="left back">
                <img src="../../static/images/06.png">
            </span>
            <span>修改密码</span>
        </div>
        <div class="myinfo">
            <p class="tit">信息填写</p>
            <p class="item">
                <span>姓名</span>
                <span class="right">请填写
                    <img class="i" src="../../static/images/s13.png">
                </span>
            </p>
            <p class="item">
                <span>手机号</span>
                <span class="right">15788889898</span>
            </p>
            <p class="item">
                <span>电子邮箱</span>
                <span class="right">请填写
                    <img class="i" src="../../static/images/s13.png">
                </span>
            </p>
            <p class="tit">信息选择</p>
            <div class="submittype">
                <p>
                    <span :class='{selected:infotype==1}' @click='changeType(1)'></span>马上联系我</p>
                <p>
                    <span :class='{selected:infotype==2}' @click='changeType(2)'></span>我想知道这个房子的具体情况</p>
            </div>
            <div class="con">
                <textarea class="tarea" placeholder="自定义内容"></textarea>
                <button class="w-btn mb40">提交</button>
            </div>
        </div>
  </div>
</template>
