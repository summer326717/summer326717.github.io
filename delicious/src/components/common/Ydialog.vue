<template>
    <div class="y-dialog">
        <div class="y-dialog-content">
            <div class="y-dialog-top">提示信息</div>
            <div class="y-dialog-body">
                <slot></slot>
            </div>
            <div class="y-dialog-bottom">
                <button class="y-normal-button">取消</button><button class="y-info-button">确认</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShowDialog: false
        }
    },
    mounted() {
        let ele = document.getElementsByClassName('y-dialog-content')[0];
        let h = ele.clientHeight;
        let winH = window.innerHeight;
        ele.style.marginTop = (winH - h)/2 + 'px'
    }
}
</script>

<style scoped>
.y-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
}
.y-dialog .y-dialog-content {
    background: #ffffff;
    border-radius: 10px;
    padding: 20px;
    width: 50%;
    position: relative;
    margin: 0 auto;
    max-height: 90%;
    overflow-y: scroll;
}
.y-dialog .y-dialog-top {
    text-align: center;
    padding: 10px 0;
}
</style>
