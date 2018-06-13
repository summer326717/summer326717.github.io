<template>
    <div class="y-loading-bg">
        <div class="y-loading-sping">
            <img src='../../assets/loading.png' />
            <p>加载中...</p>
        </div>
    </div>
</template>
<style scoped>
.y-loading-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0);
}
.y-loading-bg .y-loading-sping {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 40px;
    margin-left: -70px;
    margin-top: -68px;
    text-align: center;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 10px #484d69;
}
.y-loading-bg .y-loading-sping img {
    width: 32px;
    height: 32px;
    animation: spin 2s infinite linear;;
}
@keyframes spin {
  0%   { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}
</style>
